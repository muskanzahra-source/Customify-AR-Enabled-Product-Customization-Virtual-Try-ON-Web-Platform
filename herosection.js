//gloabal variables 
let stage, layer, tr, productGroup, productImage, colorOverlay;
let currentProductType = null;
let videoStream = null;
let videoElement = null;
let selectedText = null;
let cartItems = [];
let uploadedImageFile = null;
let poseTracker = null;
let arVideoNode = null;
let mediaPipeCamera = null;
let smooth = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0
};
let faceMesh, pose, mpCamera;
let sizeMultiplier = 1.0;
let isMediaPipeInitialized = false;
let isARActive = false;
let currentTrackingType = 'none';
let activeFilter = 'none';
let userGender = "female";

const productImages = {
  shirt: "canvas-images/shirt.png",
  mug: "canvas-images/mug.png",
  dupata: "canvas-images/dupta.png",
  pants: "canvas-images/pant.png",
  cap: "canvas-images/cap.png",
  sash: "canvas-images/sash.png",
  printed: "canvas-images/printed.png",
  suit: "canvas-images/suit.png",
  bed: "canvas-images/bed.png",
  festive: "canvas-images/festive.png",
  cover: "canvas-images/mobile.png",
  bag: "canvas-images/bag.png",
  glasses: "canvas-images/glasses.png",
  necklace: "canvas-images/necklace.png",
  braslate: "canvas-images/braslate.png",
  frock: "canvas-images/frock.png",
  keychain: "canvas-images/keychain.png"
};
function fitStageIntoParentContainer() {
    const container = document.querySelector('.canvas-wrap');
    if (!container || !stage) return;
    const containerWidth = container.offsetWidth;
    const sceneWidth = 500;
    const sceneHeight = 500;
    const scale = containerWidth / sceneWidth;
    stage.width(sceneWidth * scale);
    stage.height(sceneHeight * scale);
    stage.scale({ x: scale, y: scale });
    stage.draw();
}


// Nav bar and mobile menu
window.onload = function () {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  const closeBtn = document.getElementById("close-btn");
  if (toggle && menu && closeBtn) {
    toggle.onclick = () => menu.classList.add("active");
    closeBtn.onclick = () => menu.classList.remove("active");
  }
  const cartBtn = document.getElementById("cart");
  if (cartBtn) cartBtn.addEventListener("click", showCartModal);

  const textColorPicker = document.getElementById("textColorPicker");
  if (textColorPicker) {
    textColorPicker.addEventListener("input", function() {
      const selectedNodes = tr.nodes();
      if (selectedNodes.length > 0 && (selectedNodes[0].getClassName() === 'Text')) {
        selectedNodes[0].fill(this.value);
        layer.draw();
      }
    });
  }
  const bgRemoveBtn = document.querySelector(".bg-remover-btn"); 
  if (bgRemoveBtn) {
    bgRemoveBtn.addEventListener("click", removeBgFromStoredFile);
  }
  injectCartStyles();
  window.addEventListener('resize', fitStageIntoParentContainer);
};
function trackMyOrder() {
  let orders = JSON.parse(localStorage.getItem("allOrders")) || [];
  orders = orders.filter(order => order.items && order.items.length > 0);

  const old = document.getElementById("track-order-modal");
  if (old) old.remove();

  const modal = document.createElement("div");
  modal.id = "track-order-modal";

  modal.innerHTML = `
  <div style="position:fixed; inset:0; background:rgba(0,0,0,0.4); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; z-index:99999; font-family:'Poppins',sans-serif;">
    <div style="width:95%; max-width:550px; max-height:85vh; overflow-y:auto; background:white; border-radius:24px; box-shadow:0 25px 50px rgba(0,0,0,0.2); position:relative; animation: fadeIn 0.3s ease;">
      
      <button onclick="document.getElementById('track-order-modal').remove()" 
        style="position:absolute; top:15px; right:15px; border:none; background:#f3f4f6; width:35px; height:35px; border-radius:50%; cursor:pointer; font-weight:bold; color:#4b5563; z-index:10;">✕</button>

      <div style="padding:25px; text-align:center; color:white; border-radius:24px 24px 0 0; background:linear-gradient(135deg, #5BC0FF, #C26EFF, #FF78B4);">
        <h2 style="margin:0; font-size:22px; font-weight:600;">Track Your Orders</h2>
        <p style="margin:5px 0 0 0; font-size:12px; opacity:0.9;">Real-time status of your personalized items</p>
      </div>

      <div style="padding:20px;">
        ${orders.length === 0 ? `
          <div style="text-align:center; padding:50px 20px; color:#9ca3af;">
            <p style="margin:0;">No active orders found!</p>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:18px;">
            ${orders.map(order => `
              <div style="border:1.5px solid #C26EFF; border-radius:18px; overflow:hidden; background:#fff; box-shadow: 0 4px 12px rgba(194, 110, 255, 0.1);">
                
                <div style="padding:12px 16px; background:#fafafa; border-bottom:1px solid #f0f0f0; display:flex; justify-content:space-between; align-items:center; font-size:13px;">
                  <span style="color:#333;"><b>ID:</b> ${order.orderId}</span>
                  <span style="color:#6b7280;">${order.date}</span>
                </div>

                <div style="padding:10px 16px; display:flex; align-items:center; gap:8px;">
                  <span style="width:10px; height:10px; background:#C26EFF; border-radius:50%; display:inline-block;"></span>
                  <span style="color:#C26EFF; font-weight:600; font-size:13px;">Confirmed (Delivery in 3-4 days)</span>
                </div>

                <div style="padding:0 16px 12px 16px;">
                  ${order.items.map(item => `
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px; background:#f9f9f9; padding:10px; border-radius:14px; border:1px solid #eee;">
                      <img src="${item.image}" style="width:60px; height:60px; border-radius:10px; object-fit:cover; border:1.5px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                      <div style="flex:1;">
                        <div style="font-size:14px; font-weight:500; color:#1f2937;">${item.name}</div>
                        <div style="font-size:12px; color:#C26EFF; font-weight:600;">Rs. ${item.price}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div style="padding:12px 16px; background:linear-gradient(to right, #fff, #faf5ff); border-top:1px dashed #C26EFF; display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:14px; color:#4b5563;">Total Bill</span>
                  <span style="font-size:18px; font-weight:bold; color:#C26EFF;">Rs. ${order.total}</span>
                </div>

              </div>
            `).reverse().join('')}
          </div>
        `}
      </div>
    </div>
  </div>
  `;

  document.body.appendChild(modal);
}
function saveOrderToLocal(total, itemsArray) {
  const orderData = {
    orderId: "ORD-" + Math.random().toString(36).substr(2, 7).toUpperCase(),
    items: itemsArray,
    total: total,
    status: "Confirmed",
    date: new Date().toLocaleDateString()
  };

  let allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
  allOrders.push(orderData);
  localStorage.setItem("allOrders", JSON.stringify(allOrders));

  if (typeof updateTrackBadge === "function") updateTrackBadge();
}
// image slider of hero section
document.addEventListener("DOMContentLoaded", function () {
  const images = ["shirt.jpg", "necklace copy.jpg", "Mugs.jpg", "pants.jpg"];
  let index = 0;
  const img = document.getElementById("heroImage");
  if (img) {
    setInterval(() => {
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = images[index];
        img.style.opacity = 1;
        index = (index + 1) % images.length;
      }, 300);
    }, 2000);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const trackOrderBtn = document.querySelector(".nav-right button");
  if (trackOrderBtn) {
    trackOrderBtn.onclick = (e) => {
      e.preventDefault();
      trackMyOrder();
    };
  }
});
// on click to contact us section email 
function openEmail(){
  const subject = encodeURIComponent('Custom Design Request');
  const body = encodeURIComponent(`Hi Welcome To Our Website,\nPlease provide your customization details`);
  const email = "musamkan564@gmail.com";
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
}
// on click to contact us section whatapp
function openWhatsApp() {
  window.open("https://wa.me/923258253995", "_blank");

}
function openmail() {
    const email = "musamkan564@gmail.com";
    const subject = encodeURIComponent("Welcome To Our Website");
    const body = encodeURIComponent("How Can We Help You");
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
}
function openLoginModal() {
  const authOverlay = document.getElementById("auth-modal-overlay");
  const loginCard = document.getElementById("login-card");
  const nameInput = document.getElementById("u_name");
  const navText = document.getElementById("navLoginText");
  if (authOverlay && loginCard) {
    authOverlay.style.display = "flex";
    loginCard.style.display = "block";
    console.log("Login Modal Opened!");
  }
  else {
    console.error("Modal elements not found!");
  }
}
function loginUser() {
  const nameInput = document.getElementById("u_name");
  const navText = document.getElementById("navLoginText");
  const userName = nameInput.value.trim();
  if (!userName) {
    showToastNotification("Please enter your name!");
    return;
  }
  localStorage.setItem("username", userName);
  const navBtnText = document.querySelector("#navLoginText");
  if (navBtnText) {
    navBtnText.innerText = userName;
  }
  else { console.log("Navbar text element not found"); }
  showToastNotification(`Login successful! Welcome, ${userName}`);
  closeAuthModal();
}
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("username");
  const navText = document.getElementById("navLoginText");
  if (savedName && navText) {
    navText.innerText = savedName;
  }
});
function closeAuthModal() {
  const authOverlay = document.getElementById("auth-modal-overlay");
  if (authOverlay) {
    authOverlay.style.display = "none";
  }
}
// on click to customize button konva.js canvas open
function openCustomizer(type) {
  currentProductType = type;
  const modal = document.getElementById("customizerModal");
  if(modal) modal.style.display = "flex";

  const allDropdowns = ["cloth-material", "cup-material", "Lense-material", "eyesight-select","pants-material","size","bedsize"];
  allDropdowns.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  if (type === "glasses") {
    document.getElementById("Lense-material").style.display = "inline-block";
    document.getElementById("eyesight-select").style.display = "inline-block";
     document.getElementById("size").style.display = "inline-block";
  } 
  else if (["shirt", "printed", "frock", "festive", "suit", "cap", "dupata", "sash"].includes(type)) {
    document.getElementById("cloth-material").style.display = "inline-block";
     document.getElementById("size").style.display = "inline-block";
  } 
  else if (type === "bed") {
    document.getElementById("cloth-material").style.display = "inline-block";
     document.getElementById("bedsize").style.display = "inline-block";
  }
  else if (type === "mug") {
    document.getElementById("cup-material").style.display = "inline-block";
  }
  else if (type === "pants") {
    document.getElementById("pants-material").style.display = "inline-block";
     document.getElementById("size").style.display = "inline-block";}
 const wrap = document.querySelector(".canvas-wrap");
  wrap.innerHTML = '<div id="konvaCanvas"></div>';
  stage = new Konva.Stage({
    container: "konvaCanvas",
    width: 500,
    height: 500});
  layer = new Konva.Layer();
  stage.add(layer);
  tr = new Konva.Transformer({
    keepRatio: true,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    anchorSize: window.innerWidth < 768 ? 12 : 8,
    borderStroke: '#C26EFF'
  });
  layer.add(tr);
  fitStageIntoParentContainer();
  loadProduct(type);
  stage.on('click tap', function (e) {
    if (e.target === stage || e.target === productImage || e.target === colorOverlay) {
      tr.nodes([]);
      layer.draw();
      return; }
    if (e.target.hasName('custom-item') || e.target.hasName('custom-text')) {
      tr.nodes([e.target]);
      layer.draw(); }});
 
}
//close canvas
function closeCustomizer() {
  const modal = document.getElementById("customizerModal");
  if (modal) modal.style.display = "none";
}
//loadin products on canvas
function loadProduct(type) {
  const img = new Image();
  img.src = productImages[type] || productImages['shirt'];
  img.onload = () => {
    productGroup = new Konva.Group({ x: 50, y: 50, width: 400, height: 400 });
    layer.add(productGroup);
    productImage = new Konva.Image({
      image: img, x: 0, y: 0, width: 400, height: 400, listening: true
    });
    productGroup.add(productImage);
    colorOverlay = new Konva.Rect({
      x: 0, y: 0, width: 400, height: 400,
      fill: "transparent", opacity: 0.6,
      globalCompositeOperation: "source-atop",
      listening: false
    });
    productGroup.add(colorOverlay);

    layer.draw();
  };
}

// Color Dropdown
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("colorDropdown")?.addEventListener("change", function () {
    if (!colorOverlay || !productGroup) return;

    const selectedColor = this.value;
    productGroup.clearCache();
    if (!selectedColor || selectedColor === "transparent") {
      colorOverlay.fill("transparent");
    } else {
      colorOverlay.fill(selectedColor);
      productGroup.cache();
    }

    layer.draw();
  });
  //on selction to patrren dropdown
  document.getElementById("pattern")?.addEventListener("change", function () {
    if (!this.value) return;
    const img = new Image();
    img.src = `patterns/${this.value}.png`;
    img.onload = () => {
      const patternImg = new Konva.Image({
        image: img, x: 150, y: 150, width: 150, height: 150,
        draggable: true, name: 'custom-item'
      });

      productGroup.add(patternImg);

      tr.nodes([patternImg]);
      tr.moveToTop();
      layer.draw();
    };
    this.value = "";
  });
});

// add text btn
function addText() {
  if (!stage || !layer) return;
  const input = document.getElementById("textInput");
  const colorPicker = document.getElementById("textColorPicker");
  const textValue = input.value.trim();

  if (!textValue) { alert("Please type something first!"); return; }

  const textNode = new Konva.Text({
    text: textValue,
    x: 150,
    y: 150,
    fontSize: 24,
    fill: colorPicker.value,
    draggable: true,
    name: "custom-text"
  });
  productGroup.add(textNode);
  tr.nodes([textNode]);
  tr.moveToTop();
  selectedText = textNode;
  layer.draw();
  input.value = "";
}

// on click to upload image
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  uploadedImageFile = file;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const konvaImg = new Konva.Image({
        image: img, x: 150, y: 150, width: 120, height: 120,
        draggable: true, name: 'custom-item'
      });
      productGroup.add(konvaImg);
      tr.nodes([konvaImg]);
      tr.moveToTop();
      layer.draw();
    };
  };
  reader.readAsDataURL(file);
}
//on click to bg remover btn
async function removeBgFromStoredFile() {
  if (!uploadedImageFile) { alert("Please 'Choose File' first!"); return; }

  const selectedNodes = tr.nodes();
  const oldNode = selectedNodes.find(node => node.hasName('custom-item'));

  showToastNotification("Removing background...");
  const apiKey = "YuY7epw9eXkoEwx83WqWmt5D";
  const formData = new FormData();
  formData.append('image_file', uploadedImageFile);

  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body: formData
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (oldNode) {
          const oldX = oldNode.x();
          const oldY = oldNode.y();
          const oldW = oldNode.width();
          const oldH = oldNode.height();
          oldNode.destroy();

          const konvaImg = new Konva.Image({
            image: img,
            x: oldX,
            y: oldY,
            width: oldW,
            height: oldH,
            draggable: true,
            name: 'custom-item'
          });

          productGroup.add(konvaImg); 
          tr.nodes([konvaImg]);
          layer.draw();
        }
      };
    } else {
       alert("BG Removal failed. Check API limit.");
    }
  } catch (error) { 
    console.error(error); 
    alert("Error connecting to BG remover.");
  }
}

// //on click to reset canvas btn
function resetCanvas() {
  if (stage) stage.destroy();
  uploadedImageFile = null;
  openCustomizer(currentProductType || 'shirt');
}
//on click to remove selected btn
function removeSelected() {
  tr.nodes().forEach(n => n.destroy());
  tr.nodes([]);
  layer.draw();
}
//on click to download design btn
function downloadDesign() {
  tr.nodes([]);
  layer.draw();
  const link = document.createElement('a');
  link.download = "design.png";
  link.href = stage.toDataURL({ pixelRatio: 2 });
  link.click();
}

// add to cart section
function addToCart(btn = null) {
  let name, price, img;

  if (btn && btn.closest('.product-card')) {
    const card = btn.closest('.product-card');
    name = card.querySelector('h4').innerText;
    price = card.querySelector('.price').innerText.replace(/[^0-9.]/g, '');
    img = card.querySelector('img').src;
  }
  else if (stage) {
    tr.nodes([]);
    layer.draw();
    name = "Custom " + (currentProductType || "Product");
    price = 1500;
    img = stage.toDataURL({ pixelRatio: 0.5 });
  } else return;

  cartItems.push({ id: Date.now(), name, price: parseFloat(price), image: img });
  updateCartBadge();
  showToastNotification(`${name} added to cart!`);
}

function updateCartBadge() {
  const cartBtn = document.getElementById("cart");
  if (!cartBtn) return;
  let badge = cartBtn.querySelector('.custom-cart-badge') || document.createElement('span');
  badge.className = 'custom-cart-badge pop-anim';
  badge.innerText = cartItems.length;
  if (!cartBtn.querySelector('.custom-cart-badge')) cartBtn.appendChild(badge);
}

function showCartModal() {
  let modal = document.getElementById('myCartModal');
  let overlay = document.getElementById('cartOverlay');

  if (!modal) {
    overlay = document.createElement('div');
    overlay.id = 'cartOverlay'; overlay.className = 'cart-overlay';
    overlay.onclick = showCartModal;
    document.body.appendChild(overlay);

    modal = document.createElement('div');
    modal.id = 'myCartModal'; modal.className = 'cart-modal-container';
    document.body.appendChild(modal);
  }

  modal.classList.toggle("active");
  overlay.classList.toggle("active");
  renderCartItems(modal);
}

function renderCartItems(modal) {
  if (cartItems.length === 0) {
    modal.innerHTML = `<div class="cart-header"><h3> Your Cart</h3><button class="cart-close-btn" onclick="showCartModal()">close</button></div>
                       <p style="text-align:center; padding:50px; color:#777;">Cart is empty</p>`;
    return;
  }

  let total = 0;
  let html = `<div class="cart-header"><h3> Your Cart</h3><button class="cart-close-btn" onclick="showCartModal()">close</button></div>
              <div class="cart-items-wrapper">`;

  cartItems.forEach((item, i) => {
    total += item.price;
    html += `<div class="cart-item">
              <img src="${item.image}">
              <div class="cart-item-info"><h4>${item.name}</h4><p>Rs. ${item.price}</p></div>
              <button onclick="removeCartItem(${i})"></button>
            </div>`;
  });

  html += `</div><div class="cart-footer"><div class="cart-total"><span>Total</span><span>Rs. ${total}</span></div>
           <button class="cart-btn-primary">Checkout</button></div>`;
  modal.innerHTML = html;
}

function removeCartItem(i) {
  cartItems.splice(i, 1);
  updateCartBadge();
  renderCartItems(document.getElementById('myCartModal'));
}

function showToastNotification(msg) {
  let t = document.createElement("div");
  t.className = "custom-toast";
  t.innerHTML = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 100);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 3000);
}
//responsiveness
function injectCartStyles() {
  const s = document.createElement("style");
  s.innerHTML = `
    /* Canvas and Layout Reset */
    .canvas-wrap { 
      width: 100%; 
      max-width: 500px; 
      aspect-ratio: 1 / 1; 
      margin: 0 auto; 
      position: relative; 
      touch-action: none;
    }
    .nav-right button, #cart { 
      position: relative !important; 
      overflow: visible !important; 
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
      padding: 5px 10px;
      cursor: pointer;
    }

    /* Badge Styling*/
    .track-badge, .custom-cart-badge {
      background: linear-gradient(135deg, #C26EFF, #FF78B4) !important;
      color: white !important;
      border-radius: 50% !important;
      min-width: 20px !important; 
      height: 20px !important;
      font-size: 10px !important;
      position: absolute !important;
      top: -10px !important; 
      right: -10px !important;
      font-weight: bold !important;
      border: 2px solid white !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 100;
      padding: 0 !important;
    }

    #konvaCanvas { width: 100% !important; height: 100% !important; }

    /* Buttons Container */
    .customizer-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
    }

    /* Button styling */
    .customizer-btn, .customizer-controls select, .customizer-controls button {
      background: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 10px 15px;
      font-size: 14px;
      cursor: pointer;
      transition: 0.2s;
      text-align: center;
      flex: 1 1 auto;
      min-width: 100px;
      box-sizing: border-box;
    }

    /* Mobiles adjustment */
    @media (max-width: 768px) {
      .customizer-controls { gap: 6px; padding: 8px 4px; }
      .customizer-btn, .customizer-controls select, .customizer-controls button {
        flex: 0 0 calc(33.33% - 6px) !important;
        min-width: calc(33.33% - 6px) !important;
        max-width: calc(33.33% - 6px) !important;
        padding: 8px 2px !important;
        font-size: 11px !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    /* Cart Drawer and Overlay */
    .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 9998; display:none; }
    .cart-overlay.active { display:block; }
    .cart-modal-container { position: fixed; top: 0; right: -400px; width: 340px; height: 100vh; background: #fff; z-index: 9999; transition: 0.4s ease-in-out; display: flex; flex-direction: column; box-shadow: -5px 0 25px rgba(0,0,0,0.15); }
    .cart-modal-container.active { right: 0; }

    /* Toast Notification */
    .custom-toast { position: fixed; bottom: -60px; left: 50%; transform: translateX(-50%); background: #C26EFF; color: white; padding: 12px 25px; border-radius: 30px; transition: 0.3s; z-index: 10000; font-size: 13px; font-weight: 500; }
    .custom-toast.show { bottom: 30px; }
    
    /* Animation */
    .pop-anim { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }
  `;
  document.head.appendChild(s);
}
function renderCartItems(modal) {
  if (cartItems.length === 0) {
    modal.innerHTML = `
      <div class="cart-header"><h3>Your Cart</h3><button class="cart-close-btn" onclick="showCartModal()">✕</button></div>
      <div style="text-align:center; padding:50px;">
        <p style="color:#777;">Your cart is empty</p>
        <button class="cart-btn-primary" onclick="showCartModal()" style="margin-top:10px;">Continue Shopping</button>
      </div>`;
    return;
  }

  let total = 0;
  let html = `<div class="cart-header"><h3>Your Cart</h3><button class="cart-close-btn" onclick="showCartModal()">✕</button></div>
              <div class="cart-items-wrapper">`;

  cartItems.forEach((item, i) => {
    total += item.price;
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Rs. ${item.price.toLocaleString()}</p>
        </div>
        <button class="remove-btn" onclick="removeCartItem(${i})">✕</button>
      </div>`;
  });

  html += `</div>
           <div class="cart-footer">
             <div class="cart-total"><span>Total</span><span>Rs. ${total.toLocaleString()}</span></div>
             <button id="checkoutBtn" class="cart-btn-primary">Proceed to Checkout</button>
           </div>`;
  modal.innerHTML = html;
  const checkoutBtn = modal.querySelector("#checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      openCheckoutModal(cartItems);
    };
  }

}
function openCheckoutModal(cartItems = []) {
  const old = document.getElementById("checkout-modal");
  if (old) old.remove();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const modal = document.createElement("div");
  modal.id = "checkout-modal";

  modal.innerHTML = `
    <div style="position:fixed; inset:0; background:rgba(0,0,0,0.4); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:99999;">
        <div style="width:95%; max-width:510px; max-height:90vh; overflow:auto; background:white; border-radius:20px; position:relative; padding-bottom:10px;">
            <button id="closeCheckout" style="position:absolute; top:12px; right:12px; background:#eee; border:none; width:35px; height:35px; border-radius:50%; cursor:pointer;">✖</button>
            <div style="padding:16px; background:linear-gradient(135deg,#5BC0FF,#C26EFF,#FF78B4); color:white; text-align:center; border-radius:20px 20px 0 0;">
                <h2 style="margin:0">Checkout</h2>
            </div>
            <div style="padding:16px">
                <div style="margin-bottom:10px; max-height:200px; overflow-y:auto;">
                    ${cartItems.map(item => `
                        <div style="display:flex;gap:10px;margin-bottom:8px;align-items:center">
                            <img src="${item.image}" style="width:50px;height:50px;border-radius:8px;object-fit:cover"/>
                            <div style="flex:1">
                                <div style="font-size:12px; font-weight:bold;">${item.name}</div>
                            </div>
                            <div style="font-size:12px">Rs. ${item.price}</div>
                        </div>`).join("")}
                </div>
                <div style="border-top:2px solid #f0f0f0; padding-top:10px; margin-bottom:15px; display:flex; justify-content:space-between; font-weight:bold; font-size:14px; color:#333;">
                    <span>Sub-Total:</span>
                    <span>Rs. ${subtotal.toLocaleString()}</span>
                </div>
                <input id="c_name" placeholder="Full Name" style="${inputStyle()}"/>
                <input id="c_email" placeholder="Email" style="${inputStyle()}"/>
                <input id="c_phone" placeholder="Phone" style="${inputStyle()}"/>
                <input id="c_code" placeholder="Postal Code" style="${inputStyle()}"/>
                <textarea id="c_address" placeholder="Address" style="${inputStyle()}"></textarea>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">
                    <button class="payBtn active" data-pay="cod" style="${payBtnStyle(true)}">COD</button>
                    <button class="payBtn" data-pay="online" style="${payBtnStyle(false)}">Pay Online</button>
                </div>
                <div id="onlineBox" style="display:none; margin-top:10px; font-size:11px; color:#C26EFF; text-align:center;">
                    JazzCash/Easypaisa: 0325-8253995
                </div>
                <button id="confirmBtn" style="margin-top:15px;width:100%; padding:12px;border:none;color:white; border-radius:10px;cursor:pointer; background:linear-gradient(135deg,#5BC0FF,#C26EFF,#FF78B4); font-weight:bold;">Confirm Order</button>
            </div>
        </div>
    </div>`;

  document.body.appendChild(modal);

  // 1. Close Button Action
  document.getElementById("closeCheckout").onclick = () => modal.remove();

  const payBtns = modal.querySelectorAll(".payBtn");
  const onlineBox = modal.querySelector("#onlineBox");

  payBtns.forEach(btn => {
    btn.onclick = () => {
      payBtns.forEach(b => {
        b.classList.remove("active");
        b.style.cssText = payBtnStyle(false);
      });
      btn.classList.add("active");
      btn.style.cssText = payBtnStyle(true);
      if (btn.dataset.pay === "online") {
        onlineBox.style.display = "block";
      } else {
        onlineBox.style.display = "none";
      }
    };
  });

// Confirm Order 
document.getElementById("confirmBtn").onclick = async () => {
    const nameInput = modal.querySelector("#c_name").value.trim();
    const phoneInput = modal.querySelector("#c_phone").value.trim();
    const addressInput = modal.querySelector("#c_address").value.trim();
    const emailInput = modal.querySelector("#c_email").value.trim();
    const postalCode = modal.querySelector("#c_code").value.trim();
    if (!nameInput || !phoneInput || !addressInput || !emailInput) {
        alert("Please fill all required fields!");
        return;
    }

    const activePayBtn = modal.querySelector(".payBtn.active");
    const activePay = activePayBtn ? activePayBtn.dataset.pay : "cod";
    let customDesignImage = "";
    const currentStage = window.stage || (typeof stage !== 'undefined' ? stage : null);
    const currentLayer = window.layer || (typeof layer !== 'undefined' ? layer : null);
    const currentTr = window.tr || (typeof tr !== 'undefined' ? tr : null);

    if (currentStage) {
        try {
            if (currentTr) currentTr.nodes([]);
            if (currentLayer) currentLayer.draw();
            customDesignImage = currentStage.toDataURL({ pixelRatio: 1 });
            console.log("Canvas captured successfully!");
        } catch (e) {
            console.error("Canvas capture failed:", e);
        }
    }
    let itemsToSaveLocally = cartItems.map(item => ({ ...item }));
    
    if (customDesignImage && customDesignImage.length > 50) {
        itemsToSaveLocally.push({
            id: 'canvas_' + Date.now(),
            name: 'Custom Design',
            price: 0,
            image: customDesignImage, 
            quantity: 1
        });
    }
    const currentTotal = typeof subtotal !== 'undefined' ? subtotal : 0;
    const formData = new FormData();
    formData.append('name', nameInput);
    formData.append('email', emailInput);
    formData.append('phone', phoneInput);
    formData.append('code', postalCode);
    formData.append('address', addressInput);
    formData.append('price', currentTotal);
    formData.append('cod', activePay === "cod" ? "yes" : "");
    formData.append('online', activePay === "online" ? "yes" : "");
    formData.append('images', cartItems.map(item => item.image).join(", "));
    formData.append('custom_design', customDesignImage);
    formData.append('confirm', 'yes');

    try {
        saveOrderToLocal(currentTotal, itemsToSaveLocally);
        const response = await fetch(`./Herosection.php`, {
            method: 'POST',
            body: formData 
        });
        const text = await response.text();
        console.log("Server Response:", text);
    } catch (error) {
        console.error("Server error, but order saved locally:", error);
    }
    showToastNotification("Order Successful!");
    modal.remove();
    cartItems.length = 0;
    if (typeof updateCartBadge === "function") updateCartBadge();
    if (typeof updateTrackBadge === "function") updateTrackBadge();
};}
// Track Badge Update Function
function updateTrackBadge() {
  const trackBtn = document.querySelector(".nav-right button");
  if (!trackBtn) return;

  const orders = JSON.parse(localStorage.getItem("allOrders")) || [];
  let badge = trackBtn.querySelector('.track-badge') || document.createElement('span');
  badge.className = 'track-badge pop-anim';

  if (orders.length > 0) {
    badge.innerText = orders.length;
    badge.style.display = "inline-block";
    if (!trackBtn.querySelector('.track-badge')) trackBtn.appendChild(badge);
  } else {
    badge.style.display = "none";
  }
}


function inputStyle() {
  return `
    width:100%;
    margin-top:8px;
    padding:10px;
    border-radius:10px;
    border:1px solid #ddd;
    font-size:12px;
  `;
}

function payBtnStyle(active) {
  return `
    padding:10px;
    border-radius:10px;
    border:1px solid #ddd;
    cursor:pointer;
    font-size:12px;
    background:${active ? 'linear-gradient(135deg,#5BC0FF,#C26EFF,#FF78B4)' : '#fff'};
    color:${active ? '#fff' : '#333'};
  `;
}


//sAdd styling in feedback section
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  /* Input aur Button ka style */
  .feedback-row {
    display: flex; gap: 10px; margin-bottom: 15px; max-width: 500px; font-family: sans-serif;
  }
  #feedback {
    flex: 1; padding: 12px 18px; border: 1px solid #ddd; border-radius: 25px; outline: none; font-size: 14px; transition: 0.3s;
  }
  #feedback:focus {
    border-color: #C26EFF; box-shadow: 0 0 5px rgba(194, 110, 255, 0.3);
  }
  #sendFeedbackBtn {
    background: #C26EFF; color: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center; font-size: 16px; transition: 0.3s;
  }
  #sendFeedbackBtn:hover {
    background: #a650e6; transform: scale(1.05);
  }
  
  /* Jo feedback neechay show hoga uska style */
  .dynamic-feedback-list {
    display: flex; flex-direction: column; gap: 10px; max-width: 500px; font-family: sans-serif;
  }
  .feedback-item {
    background: #f8f9fa; padding: 12px 18px; border-radius: 12px; border-left: 5px solid #C26EFF; font-size: 14px; color: #333; animation: fadeIn 0.4s ease; word-wrap: break-word;
  }
  
  /* Entry Animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);
//Feedback 
window.addEventListener("DOMContentLoaded", () => {
    const savedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    savedFeedbacks.forEach(text => {
        renderFeedbackElement(text);
    });
});
function addfeedback() {
  const inputField = document.getElementById("feedback");
  const text = inputField.value.trim();

  if (text === "") {
    showToastNotification("Please write your feedback first!");
    return;
  }
  saveFeedbackToLocal(text);
  renderFeedbackElement(text);
  inputField.value = ""; 
  showToastNotification("Feedback added!");
  const senderName = localStorage.getItem("username") || "Guest";
  const phpUrl = window.location.origin + "/Herosection.php?feedback=" + encodeURIComponent(text) + "&send=" + encodeURIComponent(senderName);

  fetch(phpUrl)
    .then(response => response.text())
    .then(data => {
      if (data.includes("Feedback inserted in db")) {
        console.log("Database Sync Successful");
      }
    })
    .catch(error => {
      console.warn("Offline: Feedback saved only on your device.");
    });
}

function saveFeedbackToLocal(text) {
    let feedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    feedbacks.push(text);
    localStorage.setItem("userFeedbacks", JSON.stringify(feedbacks));
}
function renderFeedbackElement(text) {
    let listContainer = document.getElementById("feedback-list-container");
    
    if (!listContainer) {
        listContainer = document.createElement("div");
        listContainer.id = "feedback-list-container";
        listContainer.className = "dynamic-feedback-list";

        const row = document.querySelector(".feedback-row");
        if (row) {
            row.parentNode.insertBefore(listContainer, row.nextSibling);
        }
    }
    const newFeedback = document.createElement("div");
    newFeedback.className = "feedback-item";
    newFeedback.style = "background:#f9f9f9; padding:10px; margin-top:5px; border-radius:8px; border-left:4px solid #C26EFF;"; 
    newFeedback.innerText = text;

    if (listContainer) {
        listContainer.prepend(newFeedback); 
    }
}
// Size Dropdown
document.addEventListener("DOMContentLoaded", () => {
    const sizeDropdown = document.getElementById("size");
    if (sizeDropdown) {
        sizeDropdown.addEventListener("change", function () {
            const sizeMap = { S: 1.5, M: 2, L: 2.5, XL: 3 };
            sizeMultiplier = sizeMap[this.value] || 1.0;
        });
    }
});


//Media Pipe implementation
async function initMediaPipe() {
  if (poseTracker) return;

  // Initialize Pose
  poseTracker = new Pose({
    locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`
  });
  poseTracker.setOptions({ modelComplexity: 1, smoothLandmarks: true });
  poseTracker.onResults(onPoseResults);

  // Initialize FaceMesh
  faceMesh = new FaceMesh({
    locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`
  });
  faceMesh.setOptions({ maxNumFaces: 1 });
  faceMesh.onResults(onFace);
}

function onPoseResults(results) {
  if (!isARActive || !results.poseLandmarks || !productGroup) return;

  const lm = results.poseLandmarks;
  const W = 500;
  const H = 500;

  // Landmarks
  const nose = lm[0];
  const lShoulder = lm[11];
  const rShoulder = lm[12];
  const rWrist = lm[16];

  let targetX, targetY, targetScale, targetAngle = 0;
  let offX = productImage.width() / 2;
  let offY = productImage.height() / 2;
  const isMobile = window.innerWidth < 768;
  const mobileAdjustment = isMobile ? 1.15 : 1.0;


// Glasses Fit on eyes and ears
  if (currentProductType === "glasses") {
    const lEye = lm[1];
    const rEye = lm[4];
    const lEar = lm[7];
    const rEar = lm[8]; 
    if (lEye.visibility < 0.5 || rEye.visibility < 0.5) return;
    const W = 500; 
    const H = 500; 
    const Lx = (1 - lEye.x) * W;
    const Rx = (1 - rEye.x) * W;
    const Ly = lEye.y * H;
    const Ry = rEye.y * H;
    targetX = (Lx + Rx) / 2;
    targetY = (Ly + Ry) / 2;
    const eyeDist = Math.abs(Lx - Rx);
    const isMobile = window.innerWidth < 768;
    const mobFactor = isMobile ? 1.2 : 1.0; 
    targetScale = (eyeDist / productImage.width()) * 3.4 * sizeMultiplier * mobFactor;
    targetAngle = Math.atan2(rEar.y - lEar.y, (1 - rEar.x) - (1 - lEar.x)) * (180 / Math.PI);
    offX = productImage.width() / 2;
    offY = productImage.height() * 0.45;
  }
  // 4. Shirt,Frock,Festive,Suit,Printed
  else if (["shirt", "printed", "suit", "frock", "festive"].includes(currentProductType)) {
    if (lShoulder.visibility < 0.5 || rShoulder.visibility < 0.5) return;
    const LSx = (1 - lShoulder.x) * W;
    const LSy = lShoulder.y * H;
    const RSx = (1 - rShoulder.x) * W;
    const RSy = rShoulder.y * H;
    targetX = (LSx + RSx) / 2;
    targetY = (LSy + RSy) / 2;
    const shoulderDist = Math.hypot(RSx - LSx, RSy - LSy);
    targetScale = (shoulderDist / productImage.width()) * 2.2 * sizeMultiplier;
    targetAngle = Math.atan2(RSy - LSy, RSx - LSx) * 180 / Math.PI;
    offY = productImage.height() * 0.15;
  }
  //Event Sash
  else if (currentProductType === "sash") {
    const rShoulder = lm[12];
    const lHip = lm[23];
    if (rShoulder.visibility < 0.5 || lHip.visibility < 0.5) return;
    const W = stage.width();
    const H = stage.height();
    const RSx = (1 - rShoulder.x) * W;
    const RSy = rShoulder.y * H;
    const LHx = (1 - lHip.x) * W;
    const LHy = lHip.y * H;
    targetX = RSx;
    targetY = RSy;
    const sashLength = Math.hypot(LHx - RSx, LHy - RSy);
    targetScale = (sashLength / productImage.height()) * 1.1 * sizeMultiplier* mobileAdjustment;;
    targetAngle = Math.atan2(LHy - RSy, LHx - RSx) * 180 / Math.PI - 90;
    offX = productImage.width() / 2;
    offY = 0;
  }
  // braslate fitting on wrist
  else if (currentProductType === "braslate") {
    const rWrist = lm[16];
    const lWrist = lm[15];
    const wrist = (lWrist.visibility > rWrist.visibility) ? lWrist : rWrist;
    if (wrist.visibility < 0.5) return;
    const W = 500;
    const H = 500;
    const newX = (1 - wrist.x) * W;
    const newY = wrist.y * H;
    if (Math.abs(newX - targetX) < 2 && Math.abs(newY - targetY) < 2) return;
    targetX = newX;
    targetY = newY;
    const isMobile = window.innerWidth < 768;
    const mobFactor = isMobile ? 1.2 : 1.0; 
    targetScale = (W * 0.15 / productImage.width()) * sizeMultiplier * mobFactor;
    targetAngle = 0;
    offX = productImage.width() / 2;
    offY = productImage.height() * 0.5;
  }
  // Cap fitting on head
  else if (currentProductType === "cap") {
    const nose = lm[0];
    const leftEye = lm[3];
    const rightEye = lm[6];
    const leftEar = lm[7];
    const rightEar = lm[8];
    if (nose.visibility < 0.5) return;
    targetX = (1 - nose.x) * W;
    const eyeLevelY = ((leftEye.y + rightEye.y) / 2) * H;
    targetY = eyeLevelY - (H * 0.05);
    const Lx = (1 - leftEar.x) * W;
    const Rx = (1 - rightEar.x) * W;
    const headWidth = Math.abs(Lx - Rx);
    targetScale = (headWidth / productImage.width()) * 2.2 * sizeMultiplier;
    targetAngle = Math.atan2(rightEar.y - leftEar.y, (1 - rightEar.x) - (1 - leftEar.x)) * 180 / Math.PI;
    offX = productImage.width() / 2;
    offY = productImage.height() * 0.8;
  }
  // Pant fitting
 else if (currentProductType === "pants") {
    const lHip = lm[23];
    const rHip = lm[24];   
    if (lHip.visibility < 0.5 || rHip.visibility < 0.5) return;
    const W = 500; 
    const H = 500; 
    const LHx = (1 - lHip.x) * W;
    const RHx = (1 - rHip.x) * W;
    const LHy = lHip.y * H;
    const RHy = rHip.y * H;
    targetX = (LHx + RHx) / 2;
    targetY = (LHy + RHy) / 2;
    const hipWidth = Math.hypot(RHx - LHx, RHy - LHy);
    const isMobile = window.innerWidth < 768;
    const mobFactor = isMobile ? 1.2 : 1.0; 
    targetScale = (hipWidth / productImage.width()) * 2.8 * sizeMultiplier * mobFactor;
    targetAngle = Math.atan2(RHy - LHy, RHx - LHx) * 180 / Math.PI;  
    offX = productImage.width() / 2;
    offY = productImage.height() * 0.15;
}
 // School bag fitted on shoulders and back
  else if (currentProductType === "bag") {
    const lShoulder = lm[11];
    const rShoulder = lm[12];
    if (lShoulder.visibility < 0.5 || rShoulder.visibility < 0.5) return;
    const W = 500;
    const H = 500;
    const LSx = (1 - lShoulder.x) * W;
    const RSx = (1 - rShoulder.x) * W;
    const LSy = lShoulder.y * H;
    const RSy = rShoulder.y * H;
    targetX = (LSx + RSx) / 2;
    targetY = (LSy + RSy) / 2 + (H * 0.05);
    const shoulderDist = Math.hypot(RSx - LSx, RSy - LSy);
    const isMobile = window.innerWidth < 768;
    const mobFactor = isMobile ? 1.2 : 1.0; 
    targetScale = (shoulderDist / productImage.width()) * 1.65 * sizeMultiplier * mobFactor;
    targetAngle = Math.atan2(RSy - LSy, RSx - LSx) * 180 / Math.PI;
    offX = productImage.width() / 2;
    offY = productImage.height() * 0.1;
  }
  // Necklace setting on neck
  else if (currentProductType === "necklace") {
    const nose = lm[0];
    const lShoulder = lm[11];
    const rShoulder = lm[12];
    if (lShoulder.visibility < 0.5 || rShoulder.visibility < 0.5) return;
    const W = 500;
    const H = 500;
    const LSx = (1 - lShoulder.x) * W;
    const RSx = (1 - rShoulder.x) * W;
    const LSy = lShoulder.y * H;
    const RSy = rShoulder.y * H;
    targetX = (LSx + RSx) / 2;
    const shoulderMidY = (LSy + RSy) / 2;
    const noseY = nose.y * H;
    targetY = shoulderMidY - (Math.abs(shoulderMidY - noseY) * 0.2);
    const shoulderDist = Math.hypot(RSx - LSx, RSy - LSy);
    const isMobile = window.innerWidth < 768;
    const mobFactor = isMobile ? 1.1 : 1.0; 
    targetScale = (shoulderDist / productImage.width()) * 0.8 * sizeMultiplier * mobFactor;
    targetAngle = Math.atan2(RSy - LSy, RSx - LSx) * 180 / Math.PI;
    offX = productImage.width() / 2;
    offY = productImage.height() * 0.2;
  }
 // MUG fitting 
  else if (currentProductType === "mug") {
    const wrist = lm[16];
    const indexTip = lm[20];
    const thumbTip = lm[22];
    if (wrist.visibility < 0.5 || indexTip.visibility < 0.5) return;
    const W = 500;
    const H = 500;
    const Wx = (1 - wrist.x) * W;
    const Wy = wrist.y * H;
    const Ix = (1 - indexTip.x) * W;
    const Iy = indexTip.y * H;
    const Tx = (1 - thumbTip.x) * W;
    const Ty = thumbTip.y * H;
    targetX = (Ix + Tx) / 2;
    targetY = (Iy + Ty) / 2;
    const handDist = Math.hypot(Ix - Wx, Iy - Wy);
    const isMobile = window.innerWidth < 768;
    const mobFactor = isMobile ? 1.2 : 1.0; 
    targetScale = (handDist / productImage.width()) * 3.8 * sizeMultiplier * mobFactor;
    targetAngle = Math.atan2(Iy - Wy, Ix - Wx) * 180 / Math.PI + 90;
    offX = productImage.width() * 0.8;
    offY = productImage.height() * 0.5;
  }
  //Smothing product placement on body
  smooth.x = smooth.x * 0.6 + targetX * 0.4;
  smooth.y = smooth.y * 0.6 + targetY * 0.4;
  smooth.scale = smooth.scale * 0.6 + targetScale * 0.4;
  smooth.rotation = smooth.rotation * 0.6 + targetAngle * 0.4;

  if (tr.nodes().length > 0) tr.nodes([]);

  productGroup.setAttrs({
    x: smooth.x,
    y: smooth.y,
    scaleX: smooth.scale,
    scaleY: smooth.scale,
    rotation: smooth.rotation,
    offsetX: offX,
    offsetY: offY
  });

  layer.batchDraw();
}

//Start AR try on vedio on click ar try on btn
async function startARTryOn() {
  if (isARActive) return;
  try {
    isARActive = true;
    await initMediaPipe();
    const constraints = {
      video: { width: { ideal: 1280 }, height: { ideal: 720 } }
    };
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement = document.createElement("video");
    videoElement.srcObject = videoStream;
    videoElement.setAttribute("playsinline", true);
    videoElement.muted = true;
    await videoElement.play();
    arVideoNode = new Konva.Image({
      image: videoElement,
      x: 0,
      y: 0,
      width: 500, 
  height: 500,
  scaleX: -1,
  offsetX: 500,
      objectFit: 'cover'

    });
    layer.add(arVideoNode);
    arVideoNode.moveToBottom();
    createCloseButton();
    console.log("Starting AR for: " + currentProductType);
    async function loop() {
      if (!isARActive) return;
      if (poseTracker) await poseTracker.send({ image: videoElement });
      requestAnimationFrame(loop);
    }
    loop();
  }
  catch (err) {
    isARActive = false;
  }
}
//On click close to off camera
function createCloseButton() {
  const old = layer.findOne('#ar-close-group');
  if (old) old.destroy();

  const closeBtnGroup = new Konva.Group({
    id: 'ar-close-group',
    x: stage.width() - 85,
    y: 30,
    cursor: 'pointer',
    listening: true
  });

  const btnWidth = 70;
  const btnHeight = 35;
  const rect = new Konva.Rect({
    width: btnWidth,
    height: btnHeight,
    fill: '#C26EFF',
    stroke: 'white',
    strokeWidth: 2,
    shadowBlur: 5
  });
  const icon = new Konva.Text({
    text: 'close',
    fontSize: 14,
    fill: 'white',
    fontStyle: 'bold',
    width: btnWidth,
    height: btnHeight,
    align: 'center',
    verticalAlign: 'middle',
    listening: false
  });
  closeBtnGroup.add(rect);
  closeBtnGroup.add(icon);
  layer.add(closeBtnGroup);
  closeBtnGroup.moveToTop();
  closeBtnGroup.on('mousedown touchstart', () => {
    stopARTryOn();
  });
  layer.batchDraw();
}

//Stop AR Vedio
function stopARTryOn() {
  isARActive = false;

  if (videoStream) {
    videoStream.getTracks().forEach(t => t.stop());
    videoStream = null;
  }

  if (arVideoNode) {
    arVideoNode.destroy();
    arVideoNode = null;
  }

  const canvasBtn = layer.findOne('#ar-close-group');
  if (canvasBtn) {
    canvasBtn.destroy();
  }

  if (productGroup) {
    productGroup.setAttrs({
      x: 50,
      y: 50,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0
    });
  }

  if (videoElement) {
    videoElement.srcObject = null;
    videoElement.remove();
    videoElement = null;
  }
  layer.draw();
}
