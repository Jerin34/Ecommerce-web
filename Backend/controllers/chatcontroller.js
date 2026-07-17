const Product = require("../models/Product");
const { generateResponse } = require("../services/geminiServices");
const chatReply = async (req, res) => {
  const { message } = req.body;
  try {
    const products = await Product.find();
    const productList = products.map(
product =>( `
Name: ${product.name}
Category: ${product.category}
Price: ₹${product.price}
Description: ${product.description.slice(0, 100)}
Stock: ${product.stock}
`)).join("\n");
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }
    const prompt = `
You are an AI shopping assistant for my e-commerce website.

Here are the products available in our store:

${productList}

User Question:
${message}

Rules:
- Recommend ONLY products from the above list.
- Never invent products.
- If no product matches, politely say so.
- Keep answers concise and friendly.
`;
    const reply = await generateResponse(prompt);
    res.status(200).json({
      reply,
    });
  } catch (err) {
     if (err.status === 429) {
    return res.status(429).json({
      error: "AI request limit reached. Please try again later.",
    });
  }
    res.status(500).json({ error: err.message });
  }
};
module.exports = { chatReply };
