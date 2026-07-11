require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Ticket = require("./models/Ticket");
const Asset = require("./models/Asset");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully");
    await seedDatabase();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const formatTicket = (ticket) => {
  return {
    id: ticket._id,
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    status: ticket.status,
    assignedTo: ticket.assignedTo
  };
};

const formatAsset = (asset) => {
  return {
    id: asset._id,
    assetTag: asset.assetTag,
    deviceName: asset.deviceName,
    category: asset.category,
    location: asset.location,
    status: asset.status,
    assignedTo: asset.assignedTo
  };
};

const seedDatabase = async () => {
  const ticketCount = await Ticket.countDocuments();
  const assetCount = await Asset.countDocuments();

  if (ticketCount === 0) {
    await Ticket.insertMany([
      {
        title: "Printer offline",
        description: "Printer at front desk is not responding.",
        priority: "High",
        status: "Open",
        assignedTo: "IT Support"
      },
      {
        title: "Password reset",
        description: "User needs help resetting account password.",
        priority: "Medium",
        status: "In Progress",
        assignedTo: "Help Desk"
      }
    ]);

    console.log("Sample tickets added to MongoDB");
  }

  if (assetCount === 0) {
    await Asset.insertMany([
      {
        assetTag: "DF-1001",
        deviceName: "Dell Latitude Laptop",
        category: "Laptop",
        location: "Main Office",
        status: "Active",
        assignedTo: "Tanmoy"
      },
      {
        assetTag: "DF-2001",
        deviceName: "HP LaserJet Printer",
        category: "Printer",
        location: "Front Desk",
        status: "Maintenance",
        assignedTo: "IT Support"
      }
    ]);

    console.log("Sample assets added to MongoDB");
  }
};

app.get("/", (req, res) => {
  res.send("DeskFlow API is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend API is working",
    project: "DeskFlow IT Service Desk Portal",
    database: "MongoDB Atlas connected"
  });
});

// Ticket Routes

app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets.map(formatTicket));
  } catch (error) {
    res.status(500).json({
      message: "Error loading tickets",
      error: error.message
    });
  }
});

app.post("/api/tickets", async (req, res) => {
  try {
    const newTicket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      assignedTo: req.body.assignedTo
    });

    res.status(201).json(formatTicket(newTicket));
  } catch (error) {
    res.status(500).json({
      message: "Error creating ticket",
      error: error.message
    });
  }
});

app.put("/api/tickets/:id", async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        assignedTo: req.body.assignedTo
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json(formatTicket(updatedTicket));
  } catch (error) {
    res.status(500).json({
      message: "Error updating ticket",
      error: error.message
    });
  }
});

app.delete("/api/tickets/:id", async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

    if (!deletedTicket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json({
      message: "Ticket deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting ticket",
      error: error.message
    });
  }
});

// Asset Routes

app.get("/api/assets", async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    res.json(assets.map(formatAsset));
  } catch (error) {
    res.status(500).json({
      message: "Error loading assets",
      error: error.message
    });
  }
});

app.post("/api/assets", async (req, res) => {
  try {
    const newAsset = await Asset.create({
      assetTag: req.body.assetTag,
      deviceName: req.body.deviceName,
      category: req.body.category,
      location: req.body.location,
      status: req.body.status,
      assignedTo: req.body.assignedTo
    });

    res.status(201).json(formatAsset(newAsset));
  } catch (error) {
    res.status(500).json({
      message: "Error creating asset",
      error: error.message
    });
  }
});

app.put("/api/assets/:id", async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      {
        assetTag: req.body.assetTag,
        deviceName: req.body.deviceName,
        category: req.body.category,
        location: req.body.location,
        status: req.body.status,
        assignedTo: req.body.assignedTo
      },
      { new: true }
    );

    if (!updatedAsset) {
      return res.status(404).json({
        message: "Asset not found"
      });
    }

    res.json(formatAsset(updatedAsset));
  } catch (error) {
    res.status(500).json({
      message: "Error updating asset",
      error: error.message
    });
  }
});

app.delete("/api/assets/:id", async (req, res) => {
  try {
    const deletedAsset = await Asset.findByIdAndDelete(req.params.id);

    if (!deletedAsset) {
      return res.status(404).json({
        message: "Asset not found"
      });
    }

    res.json({
      message: "Asset deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting asset",
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});