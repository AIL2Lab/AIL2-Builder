import { NextRequest } from "next/server";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Ensure required environment variables for network config are set for testing
// if they are not in the .env file or if we are running in a standalone script context
if (!process.env.NEXT_PUBLIC_DBC_CHAIN_RPC_URL) {
    // Fallback or explicit set for testing if missing
    process.env.NEXT_PUBLIC_DBC_CHAIN_RPC_URL = "https://rpc.dbcwallet.io"; // Example default, replace with actual if known
    console.warn("⚠️ Mocking NEXT_PUBLIC_DBC_CHAIN_RPC_URL for test script.");
}
if (!process.env.NEXT_PUBLIC_DBC_CHAIN_ID) {
    process.env.NEXT_PUBLIC_DBC_CHAIN_ID = "19880818"; // DBC Mainnet ID
}
if (!process.env.NEXT_PUBLIC_DBC_CHAIN_NAME) {
    process.env.NEXT_PUBLIC_DBC_CHAIN_NAME = "DBC Mainnet";
}
if (!process.env.NEXT_PUBLIC_DBC_CHAIN_SYMBOL) {
    process.env.NEXT_PUBLIC_DBC_CHAIN_SYMBOL = "DBC";
}

import { POST } from "../src/app/api/model/route";
import { PrismaClient } from "@prisma/client";

// Mock Request object
class MockRequest extends Request {
  constructor(input: RequestInfo, init?: RequestInit) {
    super(input, init);
  }
}

// Helper to create a NextRequest-like object
function createMockRequest(body: any, headers: Record<string, string>) {
    const url = "http://localhost:3000/api/model";
    return new NextRequest(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    });
}

async function main() {
  console.log("Starting Model Creation Test...");

  // 1. Prepare Test Data
  // Use a random suffix to avoid unique constraint errors on repeated runs
  const randomSuffix = Math.floor(Math.random() * 10000);
  const testData = {
    name: `Test Model ${randomSuffix}`,
    description: "This is a test model created via script.",
    symbol: `TMS${randomSuffix}`,
    avatar: "https://example.com/avatar.png",
    socialLinks: { twitter: "https://twitter.com/test" }
  };

  const testHeaders = {
    "x-user-id": "test-user-id-123", // Mock User ID
    "x-user-address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Use a valid-looking address (Hardhat default account 0)
    "content-type": "application/json"
  };

  console.log("Test Data:", testData);
  console.log("Test Headers:", testHeaders);

  try {
    // 2. Create Mock Request
    const req = createMockRequest(testData, testHeaders);

    // 3. Call the API Handler directly
    // Note: In a real integration test, we might use `node-fetch` to hit the running server,
    // but importing the handler allows us to test logic without starting the Next.js server,
    // assuming environment variables are set correctly.
    const response = await POST(req);

    // 4. Process Response
    const responseData = await response.json();
    console.log("Response Status:", response.status);
    console.log("Response Body:", JSON.stringify(responseData, null, 2));

    if (response.status === 201) {
        console.log("✅ Model created successfully!");
    } else {
        console.error("❌ Failed to create model.");
    }

  } catch (error) {
    console.error("❌ An error occurred during the test:", error);
  }
}

// Execute the test
main();
