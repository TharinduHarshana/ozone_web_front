// import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

export const registerFormContrls = [
    {
        name : "userName",
        label : "Username",
        placeholder : "Enter your username",
        componentType : "input",
        type : "text",
    },
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your Email",
        componentType : "input",
        type : "email",
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password",
    }
];



export const loginFormContrls = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your Email",
        componentType : "input",
        type : "email",
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password",
    }
];


export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "desktop", label: "Desktop" },
        { id: "laptop", label: "Laptop" },
        { id: "desktopAccessories", label: "Desktop Accessories" },
        { id: "laptopAccessories", label: "Laptop Accessories" },
        { id: "cctvCamera", label: "CCTV Camera" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "dell", label: "Dell" },
        { id: "asus", label: "Asus" },
        { id: "msi", label: "MSI" },
        { id: "addlink", label: "Addlink" },
        { id: "hikvision", label: "Hikvision" },
        { id: "hp", label: "HP" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home/",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "desktop",
      label: "Desktop",
      path: "/shop/listing",
    },
    {
      id: "laptop",
      label: "Laptop",
      path: "/shop/listing",
    },
    {
      id: "desktopAccessories",
      label: "Desktop Accessories",
      path: "/shop/listing",
    },
    {
      id: "laptopAccessories",
      label: "Laptop Accessories",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
    {
      id: "cctvCamera",
      label: "CCTV Camera",
      path: "/shop/listing",
    },
    {
      id: "cctvCameraAccessories",
      label: "CCTV Camera Accessories",
      path: "/shop/listing",
    },
    {
      id: "printer",
      label: "Printer",
      path: "/shop/listing",
    },
    {
      id: "printerAccessories",
      label: "Printer Accessories",
      path: "/shop/listing",
    },
  ];


  
  export const categoryOptionsMap = {
    desktop: "Desktop",
    laptop: "Laptop",
    desktopAccessories: "Desktop Accessories",
    laptopAccessories: "Laptop Accessories",
    cctvCamera: "CCTV Camera",
    cctvCameraAccessories: "CCTV Camera Accessories",
    printer: "Printer",
    printerAccessories: "Printer Accessories",
  };
  
  export const brandOptionsMap = {
    dell: "Dell",
    asus: "Adidas",
    msi: "MSI",
    addlink: "Addlink",
    hikvision: "Hikvision",
    hp: "HP",
    samsung : "Samsung",
  };
  
  export const filterOptions = {
    category: [
      { id: "desktop", label: "Desktop" },
      { id: "laptop", label: "Laptop" },
      { id: "desktopAccessories", label: "Desktop Accessories" },
      { id: "laptopAccessories", label: "Laptop Accessories" },
      { id: "cctvCamera", label: "CCTV Camera" },
      { id: "cctvCameraAccessories", label: "CCTV Camera Accessories" },
      { id: "printer", label: "Printer" },
      { id: "printerAccessories", label: "Printer Accessories" },

    ],
    brand: [
      { id: "dell", label: "Dell" },
      { id: "asus", label: "Asus" },
      { id: "msi", label: "MSI" },
      { id: "addlink", label: "Addlink" },
      { id: "hikvision", label: "Hikvision" },
      { id: "hp", label: "HP" },
      { id: "samsung", label: "Samsung" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Postal Code",
      name: "postalCode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your postal code",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];


