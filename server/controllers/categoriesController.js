const db = require('../config/db');

exports.getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Categories');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { category_name, description } = req.body;
  try {
    await db.query('INSERT INTO Categories (category_name, description) VALUES (?, ?)', [category_name, description]);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name, description } = req.body;
  try {
    await db.query('UPDATE Categories SET category_name = ?, description = ? WHERE category_id = ?', [category_name, description, id]);
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Categories WHERE category_id = ?', [id]);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};