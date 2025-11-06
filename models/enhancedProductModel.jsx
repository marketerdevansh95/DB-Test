import { Schema, models, model } from "mongoose";

const enhancedProductSchema = new Schema(
  {
    // Basic Product Info
    shopifyId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    handle: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      index: true
    },
    bodyHtml: {
      type: String,
      default: ""
    },
    vendor: {
      type: String,
      index: true
    },
    productType: {
      type: String,
      index: true
    },
    
    // Brand Relationship
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true
    },
    brandUrl: {
      type: String,
      required: true
    },
    
    // Pricing & Inventory
    price: {
      type: Number,
      min: 0,
      index: true
    },
    compareAtPrice: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: "INR"
    },
    sku: {
      type: String,
      sparse: true
    },
    inventoryQuantity: {
      type: Number,
      default: 0,
      min: 0
    },
    available: {
      type: Boolean,
      default: true,
      index: true
    },
    
    // Images
    images: [{
      shopifyId: String,
      src: {
        type: String,
        required: true
      },
      alt: String,
      width: Number,
      height: Number,
      position: Number
    }],
    
    // Product Variants
    variants: [{
      shopifyId: String,
      title: String,
      price: {
        type: Number,
        min: 0
      },
      compareAtPrice: Number,
      sku: String,
      inventoryQuantity: {
        type: Number,
        default: 0
      },
      available: {
        type: Boolean,
        default: true
      },
      weight: Number,
      option1: String,
      option2: String,
      option3: String,
      position: Number
    }],
    
    // Product Options
    options: [{
      shopifyId: String,
      name: String,
      position: Number,
      values: [String]
    }],
    
    // SEO & Meta
    metaTitle: {
      type: String,
      maxlength: 160
    },
    metaDescription: {
      type: String,
      maxlength: 320
    },
    tags: {
      type: [String],
      index: true
    },
    
    // Shopify Timestamps
    shopifyCreatedAt: Date,
    shopifyUpdatedAt: Date,
    shopifyPublishedAt: Date,
    
    // System Fields
    active: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
      index: true
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    lastSynced: {
      type: Date,
      default: Date.now,
      index: true
    },
    syncStatus: {
      type: String,
      enum: ["pending", "syncing", "completed", "failed"],
      default: "pending",
      index: true
    },
    syncError: String,
    
    // Analytics & Performance
    viewCount: {
      type: Number,
      default: 0
    },
    clickCount: {
      type: Number,
      default: 0
    },
    lastViewed: Date,
    
    // Content & Additional Info
    content: String, // Custom content for SEO
    
    // Calculated Fields (for faster queries)
    hasDiscount: {
      type: Boolean,
      default: false,
      index: true
    },
    discountPercentage: Number,
    inStock: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better performance
enhancedProductSchema.index({ brand: 1, active: 1 });
enhancedProductSchema.index({ price: 1, available: 1 });
enhancedProductSchema.index({ productType: 1, brand: 1 });
enhancedProductSchema.index({ tags: 1, active: 1 });
enhancedProductSchema.index({ title: "text", bodyHtml: "text", tags: "text" });

// Virtual fields
enhancedProductSchema.virtual('isOnSale').get(function() {
  return this.compareAtPrice && this.compareAtPrice > this.price;
});

enhancedProductSchema.virtual('savings').get(function() {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return this.compareAtPrice - this.price;
  }
  return 0;
});

enhancedProductSchema.virtual('savingsPercentage').get(function() {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

// Pre-save middleware to calculate derived fields
enhancedProductSchema.pre('save', function(next) {
  // Calculate hasDiscount
  this.hasDiscount = this.compareAtPrice && this.compareAtPrice > this.price;
  
  // Calculate discount percentage
  if (this.hasDiscount) {
    this.discountPercentage = Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  } else {
    this.discountPercentage = 0;
  }
  
  // Calculate inStock
  this.inStock = this.available && this.inventoryQuantity > 0;
  
  next();
});

// Static methods
enhancedProductSchema.statics.findByBrand = function(brandId, options = {}) {
  const {
    page = 1,
    limit = 24,
    sortBy = 'title',
    sortOrder = 'asc',
    minPrice,
    maxPrice,
    productType,
    inStock,
    onSale
  } = options;
  
  const query = { brand: brandId, active: 'Y' };
  
  // Apply filters
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }
  
  if (productType) {
    query.productType = productType;
  }
  
  if (inStock === true) {
    query.inStock = true;
  }
  
  if (onSale === true) {
    query.hasDiscount = true;
  }
  
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  const skip = (page - 1) * limit;
  
  return this.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('brand', 'name path url');
};

enhancedProductSchema.statics.searchProducts = function(searchTerm, options = {}) {
  const {
    page = 1,
    limit = 24,
    brands = [],
    categories = [],
    minPrice,
    maxPrice
  } = options;
  
  const query = {
    active: 'Y',
    $text: { $search: searchTerm }
  };
  
  if (brands.length > 0) {
    query.brand = { $in: brands };
  }
  
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }
  
  const skip = (page - 1) * limit;
  
  return this.find(query, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(limit)
    .populate('brand', 'name path url');
};

// Instance methods
enhancedProductSchema.methods.incrementView = function() {
  this.viewCount += 1;
  this.lastViewed = new Date();
  return this.save();
};

enhancedProductSchema.methods.incrementClick = function() {
  this.clickCount += 1;
  return this.save();
};

const EnhancedProduct = models.EnhancedProduct || model("EnhancedProduct", enhancedProductSchema);

export default EnhancedProduct;
