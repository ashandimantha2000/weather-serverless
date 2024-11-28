//this is to validate incoming requests
export default {
    type: "object",
    properties: {
        city: { type: "string" },
        temperature: { type: "number" },
        humidity: { type: "number" },
        // description: { type: "string" },
    },
    required: ["city", "temperature", "humidity"],
}