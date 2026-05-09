
<!DOCTYPE html>
<html lang="en">

<head>

  <title>Customify | AR-Enabled Product Customization and Virtual Try-On Platform</title>

  <link rel="icon" type="image/png" sizes="512x512" href="website title logo.png">
  <link rel="stylesheet" href="herosection.css">
   <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="herosection.js"></script>
    <!-- importing konvaJS -->
<script src="https://cdn.jsdelivr.net/npm/konva@9/konva.min.js"></script>
<!-- MediaPipe Face Mesh -->
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js" crossorigin="anonymous"></script>

<!-- MediaPipe Pose -->
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js" crossorigin="anonymous"></script>
<!-- Camera Utils -->

<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>

<!-- Drawing Utils -->
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
  <meta name="title" content="Customify | AR-Enabled Product Customization and Virtual Try-On Platform">
  <meta name="description"
    content="Customify lets you design and personalize products like shirts, mugs, bags, and glasses with live previews and virtual try-on using AR. Create, customize, and order your favorite products easily online.">
  <meta name="keywords" 
    content="Customify, product customization, AR try-on, virtual try-on, Fabric.js, WebAR, online shopping, personalized gifts, custom shirts, custom mugs, design your own product, live preview, online payment, cash on delivery">
  <meta name="author" content="Customify Team">
  <meta name="robots" content="index, follow">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">

</head>

<body>
  <section>
    <header>
      <nav class="nav">
        <!-- Logo -->
        <div class="logo">
          <img src="header logo.png" alt="logo">
        </div>

        <!-- Desktop Menu -->
        <ul class="desktop-menu">
           <li><a href="#home">Home</a></li>
          <li><a href="#our product">Products</a></li>
          <li><a href="#customize">Customize</a></li>
          <li><a href="#how it work">How It Works</a></li>
          <li><a href="#about us">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>

        <!-- Right Side -->
        <div class="nav-right">
          <button  id="trackBtn" onclick="trackMyOrder()">
            <i class="fa-solid fa-box"></i>
            <span class="btn-text">Track Order</span>
          </button>

         <button onclick="openLoginModal()" class="nav-btn">
    <i class="fa-regular fa-user"></i>
    <span id="navLoginText" class="btn-text">Login</span>
</button>

          <button id="cart">
            <i class="fa-solid fa-cart-arrow-down"></i>
          </button>
        </div>
        <!-- Hamburger -->
        <div class="menu-toggle" id="menu-toggle">
          <i class="fa-solid fa-bars"></i>
        </div>
        </div>
        <!-- Mobile Menu -->
        <ul class="mobile-menu">

          <!-- Close Button -->
          <div class="close-btn" id="close-btn">
            <i class="fa-solid fa-xmark"></i>
          </div>

          <li><a href="#home">Home</a></li>
          <li><a href="#our product">Products</a></li>
          <li><a href="#customize">Customize</a></li>
          <li><a href="#how it work">How It Works</a></li>
          <li><a href="#about us">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>

        </ul>

      </nav>
    </header>
  </section>
  <!--Hero section-->

  <section id="home" class="hero">
    <!-- Background blobs -->
    <div class="blob blob1"></div>
    <div class="blob blob2"></div>
    <div class="blob blob3"></div>

    <div class="container">
      <div class="grid">

        <!-- LEFT TEXT -->
        <div class="text">
          <h1 >Customize Anything </h1>
          <h2 >Your Style, Your Way</h2>
          <p>
            Create unique, personalized products that reflect your personality.
            Choose from our collection and make it yours.
          </p>
        </div>

        <!-- RIGHT IMAGE -->
        <div class="image-section">
          <div class="glow"></div>

          <div class="image-box">
            <img id="heroImage" src="" alt="">

          </div>

          <!-- floating dots -->
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
        </div>

      </div>
    </div>
  </section>
  <!-- Product card section-->
   
<section id="our product"class="products">
  <h1 id="pro"> Our Products</h1>
  <div class="products-container">
    <!-- PRODUCT 1 -->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="shirt.jpg" alt="">
        </div>
        <div class="product-info">
          <h4>Custom T-Shirt</h4>
          <p class="price">Rs:1000</p>
          <div class="btn-group">
            <button onclick="addToCart(this)">Add to cart</button>
            <button class="primary" onclick="openCustomizer('shirt')">Customize</button>
          </div>
        </div>
      </div>
    </div>
     <!-- PRODUCT 2-->
    <div class="product-card">
      <div class="card-inner">
        <img src="glasses.jpg">
        <h4>Custom Glasses</h4>
        <p class="price">Rs:1200</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary" onclick="openCustomizer('glasses')">Customize</button>
        </div>
      </div>
    </div> 

    <!-- PRODUCT 3-->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="pants.jpg" alt="">
        </div>
        <div class="product-info">
          <h4>Custom Pants</h4>
          <p class="price">Rs:1500</p>
          <div class="btn-group">
            <button onclick="addToCart(this)">Add to cart</button>
            <button class="primary" onclick="openCustomizer('pants')">Customize</button>
          </div>
        </div>
      </div>
    </div>
    
       <!-- PRODUCT 4-->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="cap.jpg" alt="">
        </div>
        <div class="product-info">
          <h4>Custom Caps</h4>
          <p class="price">Rs:700</p>
          <div class="btn-group">
            <button onclick="addToCart(this)">Add to cart</button>
            <button class="primary" onclick="openCustomizer('cap')">Customize</button>
          </div>
        </div>
      </div>
    </div>
     <!-- PRODUCT 5 -->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="necklace.jpg" alt="">
        </div>
        <div class="product-info">
          <h4>Custom Lockets</h4>
          <p class="price">Rs:1200</p>
          <div class="btn-group">
            <button onclick="addToCart()">Add to cart</button>
            <button class="primary" onclick="openCustomizer('necklace')">Customize</button>
          </div>
        </div>
      </div>
    </div>
    <!-- PRODUCT 6 -->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="bangle.jpg" alt="">
        </div>
        <div class="product-info">
          <h4>Custom Bangles</h4>
          <p class="price">Rs:1000</p>
          <div class="btn-group">
            <button onclick="addToCart(this)">Add to cart</button>
            <button class="primary" onclick="openCustomizer('braslate')">Customize</button>
          </div>
        </div>
      </div>
    </div>

    <!-- PRODUCT 7-->
    <div class="product-card">
      <div class="card-inner">
        <img src="frocks'.png">
        <h4>Frocks</h4>
        <p class="price">Rs:1600</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary" onclick="openCustomizer('printed')">Customize</button>
        </div>
      </div>
    </div>
    <!-- PRODUCT 8-->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="custom frock.png" alt="">
        </div>
        <div class="product-info">
          <h4>Customized Frock</h4>
          <p class="price">Rs:2000</p>
          <div class="btn-group">
            <button onclick="addToCart(this)">Add to cart</button>
            <button class="primary" onclick="openCustomizer('frock')">Customize</button>
          </div>
        </div>
      </div>
    </div>
     <!-- PRODUCT 9 -->
    <div class="product-card">
      <div class="card-inner">
        <img src="casual wear (2).png">
        <h4>Casual Wear</h4>
        <p class="price">Rs:1550</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary" onclick="openCustomizer('suit')">Customize</button>
        </div>
      </div>
    </div>
         <!-- PRODUCT 10 -->
    <div class="product-card">
      <div class="card-inner">
        <img src="festive wear.png">
        <h4>Festive Wear</h4>
        <p class="price">Rs:5500</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary"onclick="openCustomizer('festive')">Customize</button>
        </div>
      </div>
    </div>
    <!-- PRODUCT 11 -->
    <div class="product-card">
      <div class="card-inner">
        <img src="schoolbag.png">
        <h4>Custom Bags</h4>
        <p class="price">Rs:2500</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary" onclick="openCustomizer('bag')">Customize</button>
        </div>
      </div>
    </div>
<!-- PRODUCT 12 -->
    <div class="product-card">
      <div class="card-inner">
        <img src="sashes.jpg">
        <h4>Custom Event Sashes</h4>
        <p class="price">Rs:850</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary" onclick="openCustomizer('sash')">Customize</button>
        </div>
      </div>
    </div>
       <!-- PRODUCT 13 -->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="Mugs.jpg" alt="">
        </div>
        <div class="product-info">
          <h4>Custom Mug</h4>
          <p class="price">Rs:750</p>
          <div class="btn-group">
            <button onclick="addToCart(this)">Add to cart</button>
            <button class="primary" onclick="openCustomizer('mug')">Customize</button>
          </div>
        </div>
      </div>
    </div>
       <!-- PRODUCT 14-->
    <div class="product-card">
      <div class="card-inner">
        <img src="bedsheet.jpg">
        <h4>Custom BedSheets</h4>
        <p class="price">Rs:1800</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary" onclick="openCustomizer('bed')">Customize</button>
        </div>
      </div>
    </div>
     <!-- PRODUCT 15 -->
    <div class="product-card">
      <div class="card-inner">
        <img src="mobile cover.jpg">
        <h4>Custom Mobile Covers</h4>
        <p class="price">Rs:950</p>
        <div class="btn-group">
          <button onclick="addToCart(this)">Add to cart</button>
          <button class="primary" onclick="openCustomizer(`cover`)">Customize</button>
        </div>
      </div>
    </div>
    <!-- PRODUCT 16 -->
    <div class="product-card">
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="keychin.png" alt="">
        </div>
        <div class="product-info">
          <h4>Custom Keychain</h4>
          <p class="price">Rs:650</p>
          <div class="btn-group">
            <button onclick="addToCart(this)">Add to cart</button>
            <button class="primary" onclick="openCustomizer('keychain')">Customize</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!--how it work -->
<section id="how it work" class="how-it-works">
<p class="po">How Customify Works </p>
<p class="pk">Four simple steps to create your perfect custom product</p> 
  <!-- STEP 1 -->
  <div class="step">
    <div class="icon-wrapper">
      <div class="icon-circle">
  <i class="ico"data-lucide="package-2"></i> 
      </div>
      <div class="step-number">1</div>
    </div>

    <p class="ty">Choose Product</p>
    <p class="et">Browse our collection and select your favorite item</p>
  </div>

  <!-- STEP 2 -->
  <div class="step">
    <div class="icon-wrapper">
      <div class="icon-circle">
      <i class="ico" data-lucide="palette"></i>
      </div>
      <div class="step-number">2</div>
    </div>

    <p class="ty">Customize Design</p>
    <p class="et">Add your design, text, or artwork to personalize it</p>
  </div>

  <!-- STEP 3 -->
  <div class="step">
    <div class="icon-wrapper">
      <div class="icon-circle">
        <i  class="ico" data-lucide="eye"></i> 
      </div>
      <div class="step-number">3</div>
    </div>

    <p class="ty">Preview & Confirm</p>
    <p class="et">Review your custom product before placing order</p>
  </div>

  <!-- STEP 4 -->
  <div class="step">
    <div class="icon-wrapper">
      <div class="icon-circle">
       <i class="ico" data-lucide="van"></i>  
      </div>
      <div class="step-number">4</div>
    </div>
    <p class="ty">Get It Delivered</p>
    <p class="et">We deliver your personalized product to your doorstep</p>
  </div>
  <!--adding lucid icons-->
  <script>
  lucide.createIcons();
</script>
</section>
<!--Customize via email-->
<section id="customize" class="custom-section">
  <div class="customcontainer">

    <div class="custom-box">
      
      <!-- back Glow -->
      <div class="back"></div>

      <div class="content">
        <h4>
          Want something unique? Request your custom design via email
        </h4>

        <button onclick="openEmail()" class="custom-btn">
          Customize via Email
        </button>
      </div>

    </div>

  </div>
</section>
<!--About Us Section-->
<section id="about us" class="about">
  <!-- Background blobs -->
  <div class="about-blob blob1"></div>
  <div class="about-blob blob2"></div>

  <div class="about-container">

    <!-- TOP CONTENT -->
    <div class="about-heading">
      <div class="badge">
        <i class="gradient-icon" data-lucide="sparkles" ></i>
        <span>Our Story</span>
      </div>

      <h2>About Customify</h2>
      <p>
        At Customify, we believe your style should speak for you.
        From shirts to accessories, we make personalization easy,
        fun, and high-quality — crafted just for you.
      </p>
    </div>

    <!-- FEATURES -->
    <div class="about-features">

      <!-- CARD 1 -->
      <div class="about-card">
        <div class="card-inner2">
          <div class="about-icon-box">
            <i class="ico" data-lucide="heart"></i>
          </div>
          <h3>Made with Love</h3>
          <p>Every product is crafted with care and attention to detail</p>
        </div>
      </div>

      <!-- CARD 2 -->
      <div class="about-card">
        <div class="card-inner2">
          <div class="about-icon-box">
            <i class="ico" data-lucide="award"></i>
          </div>
          <h3>Premium Quality</h3>
          <p>We use only the finest materials for lasting impressions</p>
        </div>
      </div>

      <!-- CARD 3 -->
      <div class="about-card">
        <div class="card-inner2">
          <div class="about-icon-box">
            <i class="ico" data-lucide="users"></i>
          </div>
          <h3>Customer First</h3>
          <p>Your satisfaction is our top priority, always</p>
        </div>
      </div>

    </div>

    <!-- MISSION -->
    <div class="mission">
      <p>
        "Our mission is to transform ordinary products into extraordinary
        expressions of your unique personality. We're here to make customization
        accessible, affordable, and absolutely amazing."
      </p>
    </div>

  </div>
   <!--adding lucid icons-->
  <script>
  lucide.createIcons();
</script>
</section>
<!-- Contact Us -->
<section id="contact" class="contact">
  <div class="contact-container">

    <h2 class="contact-title">Contact Us</h2>

    <div class="contact-card-border">
      <div class="contact-card">

        <!-- Phone -->
        <div class="contact-item">
          <div class="contact-icon">
            <i style="color: #fff;" data-lucide="phone"></i>
          </div>
          <div>
            <p class="contact-label">Phone</p>
            <p class="link" onclick="openWhatsApp()">+92-3258253995</p>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Email -->
        <div class="contact-item">
          <div class="contact-icon">
            <i style="color: #fff;"  data-lucide="mail"></i>
          </div>
          <div>
            <p class="contact-label">Email</p>
            <p class="link" onclick="openmail()">musamkan564@gmail.com</p>
          </div>
        </div>

      </div>
    </div>

  </div>
     <!--adding lucid icons-->
  <script>
  lucide.createIcons();
</script>
</section>
<!-- Canvas-->
<div id="customizerModal" class="modal">
  <div class="modal-content">
    <button class="close1" onclick="closeCustomizer()" aria-label="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="top-bar">
      <button onclick=" removeBgFromStoredFile()">BG-Remover</button>
      <button onclick="startARTryOn()">AR Try-On</button>
    <button type="button" onclick="addToCart()">Add to Cart</button>
      <button type="button" onclick="removeSelected()">Remove Selected</button>
      <button type="button" onclick="resetCanvas()">Reset</button>
      <button type="button" onclick="downloadDesign()">Download</button>
    </div>

    <div class="customizer-body">
      <div class="canvas-wrap">
        <canvas id="canvas" width="400" height="400"></canvas>
      </div>

      <div class="controls-panel">
        <div class="controls">
          <select id="colorDropdown">
            <option value="">Select Color</option>
            <option value="#ffff">White</option>
            <option value="#ff0000">Red</option>
            <option value="#0000ff">Blue</option>
            <option value="#008000">Green</option>
            <option value="#000000">Black</option>
            <option value="#ff69b4">Pink</option>
          </select>

          <select class="material-dropdown" id="cloth-material" style="display:none;">
            <option value="">Select Material</option>
            <option value="lawn">Lawn</option>
            <option value="silk">Silk</option>
            <option value="cotton">Cotton</option>
            <option value="khaddar">Khaddar</option>
            <option value="linen">Linen</option>
          </select>
 <select class="material-dropdown" id="pants-material" style="display:none;">
            <option value="">Select Material</option>
            <option value="jeans">Jeans</option>
            <option value="cotton">Cotton</option>
            <option value="Denim">Denim</option>
            <option value="linen">Linen</option>
            <option value="wool">Wool</option>
            <option value="rayon">Rayon</option>
          </select>
            <select class="material-dropdown" id="cup-material" style="display:none;">
            <option value="">Select Material</option>
            <option value="glass">Glass</option>
            <option value="acrylic">Acrylic</option>
            <option value="ceremic">Ceramic</option>
            <option value="plastic">Plastic</option>
          </select>
         <select class="material-dropdown" id="Lense-material">
            <option value="">Select Lense</option>
            <option value="glass">Glass</option>
            <option value="plastic">Plastic</option>
          </select>
<select class="material-dropdown"  id="eyesight-select" style="display:none;"name="eyesight">
  <option value="" selected disabled>Select Power</option>
<optgroup label="Nearsighted (Myopia)">
        <option value="-0.25">-0.25</option>
        <option value="-0.50">-0.50</option>
        <option value="-0.75">-0.75</option>
        <option value="-1.00">-1.00</option>
        <option value="-1.25">-1.25</option>
        <option value="-1.50">-1.50</option>
        <option value="-2.00">-2.00</option>
        <option value="-2.50">-2.50</option>
        <option value="-3.00">-3.00</option>
</optgroup>
    <optgroup label="Normal">
        <option value="0.00">0.00 (Plano)</option>
    </optgroup>
 <optgroup label="Farsighted (Hyperopia)">
        <option value="+0.25">+0.25</option>
        <option value="+0.50">+0.50</option>
        <option value="+0.75">+0.75</option>
        <option value="+1.00">+1.00</option>
        <option value="+1.25">+1.25</option>
        <option value="+1.50">+1.50</option>
        <option value="+2.00">+2.00</option>
    </optgroup>
</select>
   <select id="pattern">
            <option value="">Select Pattern</option>
            <option value="doremon">Doremon</option>
            <option value="tom">Tom & Jerry</option>
          </select>
            <select id="size" class="material-dropdown"  style="display:none;">
            <option value="">Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
             <option value="XL">XL</option>
          </select>
           <select id="bedsize" class="material-dropdown"  style="display:none;">
            <option value="">Size</option>
            <option value="d">Double Bed</option>
            <option value="s">Single Bed</option>
          </select>
 <input type="text" id="textInput" placeholder="Write your text here">
<button onclick="addText()">Add Text</button>
     <input type="color" id="textColorPicker" value="#000000" />

          <input type="file" id="imgUpload" accept="image/*" onchange="handleImageUpload(event)">
        </div>
        <div class="feedback-row">
          <input type="text" id="feedback" placeholder="Share your feedback" name="feedback">
          <button type="button" onclick="addfeedback()" id="sendFeedbackBtn" name="send" >
            <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<button id="cart"><i class="fa-solid fa-cart-arrow-down"></i></button>
<ul id="cartItems"></ul>
<!--  Checkout Modal -->
<div id="checkout-overlay" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); backdrop-filter:blur(6px); align-items:center; justify-content:center; z-index:99999;">
    <div style="width:95%; max-width:510px; max-height:90vh; overflow:auto; background:white; border-radius:20px; position:relative; padding-bottom:10px;">
        <div style="padding:16px; background:linear-gradient(135deg,#5BC0FF,#C26EFF,#FF78B4); color:white; text-align:center; border-radius:20px 20px 0 0;">
            <h2 style="margin:0">Checkout</h2>
        </div>
<div style="padding:16px">
           
            <div id="checkout-items-list" name="images" style="margin-bottom:10px; max-height:200px; overflow-y:auto; border-bottom:1px solid #f0f0f0; padding-bottom:10px;">
            </div>
            <div style="padding-top:10px; margin-bottom:15px; display:flex; justify-content:space-between; font-weight:bold; font-size:14px; color:#333;">
                <span>Sub-Total:</span>
        <span name="price "id="checkout-subtotal">Rs. 0</span>
            </div>
            <input id="c_name" placeholder="Full Name" name="name"style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:8px;">
            <input id="c_email" placeholder="Email" name="email"style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:8px;">
            <input id="c_phone" placeholder="Phone" name="phone"style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:8px;">
            <input id="c_code" placeholder="Postal Code" name="code" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:8px;">
            <textarea id="c_address" placeholder="Address" name="address"style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:8px; height:60px;"></textarea>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px">
                <button type="button" class="payBtn active" onclick="switchPay('cod')" id="btn-cod" name="cod" style="padding:10px; cursor:pointer; border-radius:8px; border:none; background:#C26EFF; color:white;">COD</button>
                <button type="button" class="payBtn" onclick="switchPay('online')" id="btn-online"name="online" style="padding:10px; cursor:pointer; border-radius:8px; border:none; background:#eee; color:#333;">Pay Online</button>
            </div>
            <div id="onlineBox" style="display:none; margin-top:10px; font-size:11px; color:#C26EFF; text-align:center;">
                JazzCash/Easypaisa: 0325-8253995
            </div>
            <button onclick="confirmOrderAction()" name="confirm" style="margin-top:15px; width:100%; padding:12px; border:none; color:white; border-radius:10px; cursor:pointer; background:linear-gradient(135deg,#5BC0FF,#C26EFF,#FF78B4); font-weight:bold;">Confirm Order</button>
        </div>
    </div>
</div>
<!-- Login form -->
<div id="auth-modal-overlay" style="position:fixed; inset:0; z-index:100000; display:none; align-items:center; justify-content:center; padding:16px; background:rgba(0,0,0,0.4); backdrop-filter:blur(4px); font-family:sans-serif;">
    <div id="login-card" style="background:white; border-radius:24px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); overflow:hidden; position:relative; width:360px; height:400px; display: none;">
        <button onclick="closeAuthModal()" style="position:absolute; top:16px; right:16px; z-index:10; padding:6px; border-radius:50%; border:none; background:#f3f4f6; cursor:pointer;">
            <svg style="width:20px; height:20px; color:#4b5563;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div style="padding:24px; background:linear-gradient(135deg, #5BC0FF 0%, #C26EFF 50%, #FF78B4 100%); text-align:center;">
            <h2 style="font-size:24px; color:white; margin:0; font-weight:500;">Login</h2>
        </div>
        <form id="loginForm" style="padding:24px; display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; flex-direction:column; gap:8px;">
                <label style="font-size:14px; color:#374151;">Name</label>
                <input type="text" id="u_name" required placeholder="Enter your name"name="logname" style="width:100%; padding:10px; border:2px solid #e5e7eb; border-radius:12px; outline:none; box-sizing:border-box;">
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
                <label style="font-size:14px; color:#374151;">Email</label>
                <input type="email" required placeholder="Enter your email" name="logmail"style="width:100%; padding:10px; border:2px solid #e5e7eb; border-radius:12px; outline:none; box-sizing:border-box;">
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
                <label style="font-size:14px; color:#374151;">Password</label>
                <input type="password" required placeholder="Enter your password"name="logpass" style="width:100%; padding:10px; border:2px solid #e5e7eb; border-radius:12px; outline:none; box-sizing:border-box;">
            </div>      
            <button type="submit" onclick="loginUser()" style="width:100%; padding:12px; border:none; border-radius:12px; color:white; font-weight:bold; cursor:pointer; background:linear-gradient(135deg, #5BC0FF 0%, #C26EFF 50%, #FF78B4 100%);">Login</button>
        </form>
    </div>
</div>
</body>
</html>
<!--PHP Section-->
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include("db_config.php");
//Feedbcaks sending to customizer_db
if (isset($_GET['feedback']) && isset($_GET['send'])) {
    $feed = mysqli_real_escape_string($conn, $_GET['feedback']);
    $send = mysqli_real_escape_string($conn, $_GET['send']);
    
    $query = "INSERT INTO feedback (feedback_col, sender_col) VALUES ('$feed', '$send')";
    if (mysqli_query($conn, $query)) {
        echo "Feedback inserted in db";
    }
}
//login Form data sending to customizer_db
if (isset($_GET['logname']) && isset($_GET['logmail']) && isset($_GET['logpass'])) {
    $name = mysqli_real_escape_string($conn, $_GET['logname']);
    $mail = mysqli_real_escape_string($conn, $_GET['logmail']);
    $pass = mysqli_real_escape_string($conn, $_GET['logpass']);
    $query3 = "INSERT INTO userlogin (full_name, email, password) VALUES ('$name', '$mail', '$pass')";
    
    if (mysqli_query($conn, $query3)) {
        echo "Account created with Name: " . $name;
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
//order section
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['confirm'])) {
    // 1. Data receive aur sanitize karein
    $n = mysqli_real_escape_string($conn, $_POST['name']);
    $e = mysqli_real_escape_string($conn, $_POST['email']);
    $p = mysqli_real_escape_string($conn, $_POST['phone']);
    $c = mysqli_real_escape_string($conn, $_POST['code']);
    $a = mysqli_real_escape_string($conn, $_POST['address']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $img_normal = mysqli_real_escape_string($conn, $_POST['images']); 
    $img_custom = mysqli_real_escape_string($conn, $_POST['custom_designs']); 
    $method = ($_POST['online'] === "yes") ? "Online" : "COD";
    $order_id = "ORD-" . strtoupper(substr(md5(time() . $p), 0, 7));
    $query2 = "INSERT INTO orders (order_id, full_name, email, phone, postal_code, address, payment_method, total_price, product_images, customized_design) 
               VALUES ('$order_id', '$n', '$e', '$p', '$c', '$a', '$method', '$price', '$img_normal', '$img_custom')";
    if (mysqli_query($conn, $query2)) {
        echo "Order placed successfully! Order ID: " . $order_id;
    } else {
        echo "Error: " . mysqli_error($conn);
    }
    exit;
}
?>