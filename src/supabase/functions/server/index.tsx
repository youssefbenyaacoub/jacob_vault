import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const BASE_PATH = "/make-server-4138cd39";

// Initialize Inventory if not exists
const initializeInventory = async () => {
  const existing = await kv.get('inventory');
  if (!existing) {
    // Default inventory for our items
    const initialInventory = {
      "1": { name: "Kinetic Shell", stock: 24, price: 420 },
      "2": { name: "Draftsman Trousers", stock: 100, price: 280 },
      "3": { name: "Void Knit", stock: 0, price: 350 },
      "4": { name: "Observer Parka", stock: 12, price: 580 },
    };
    await kv.set('inventory', initialInventory);
  }
};

// Health check
app.get(`${BASE_PATH}/health`, (c) => c.json({ status: "ok" }));

// GET Inventory
app.get(`${BASE_PATH}/inventory`, async (c) => {
  await initializeInventory();
  const inventory = await kv.get('inventory');
  return c.json(inventory);
});

// UPDATE Inventory (Admin)
app.post(`${BASE_PATH}/inventory/update`, async (c) => {
  const { productId, stock } = await c.req.json();
  const inventory = await kv.get('inventory') || {};
  if (inventory[productId]) {
    inventory[productId].stock = stock;
    await kv.set('inventory', inventory);
    return c.json({ success: true, inventory });
  }
  return c.json({ error: "Product not found" }, 404);
});

// GET Orders
app.get(`${BASE_PATH}/orders`, async (c) => {
  const orders = await kv.get('orders') || [];
  return c.json(orders);
});

// CREATE Order & Reduce Stock
app.post(`${BASE_PATH}/orders`, async (c) => {
  const orderData = await c.req.json();
  const { items, customerEmail, total } = orderData;
  
  const inventory = await kv.get('inventory') || {};
  const orders = await kv.get('orders') || [];

  // Check stock and reduce
  for (const item of items) {
    const productId = item.id.toString();
    if (inventory[productId]) {
      if (inventory[productId].stock >= item.quantity) {
        inventory[productId].stock -= item.quantity;
      } else {
        return c.json({ error: `Insufficient stock for ${inventory[productId].name}` }, 400);
      }
    }
  }

  // Create order object
  const newOrder = {
    id: `REC-${Date.now()}`,
    date: new Date().toISOString(),
    customerEmail,
    items,
    total,
    status: 'Confirmed'
  };

  orders.push(newOrder);
  
  // Persist
  await kv.set('inventory', inventory);
  await kv.set('orders', orders);

  return c.json({ success: true, orderId: newOrder.id });
});

Deno.serve(app.fetch);
