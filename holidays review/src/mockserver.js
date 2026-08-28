import { createServer, Model, hasMany, belongsTo } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      // 1. Define the relationship in the configuration
      user: Model.extend({
        albums: hasMany(),
      }),
      album: Model.extend({
        user: belongsTo(),
      }),
    },

    // Seed a mock user with known credentials for testing
    seeds(server) {
      // 2. Create the user first
      const user1 = server.create("user", {
        email: "user@example.com",
        password: "1111",
        name: "John Doe",
      });
      const user2 = server.create("user", {
        email: "user2@example.com",
        password: "2222",
        name: "Jane Smith",
      });
      const user3 = server.create("user", {
        email: " ",
        password: "0000",
        name: "Demo",
      });
      // 3. Create an initial album linked directly to that user
      server.create("album", {
        userId: user1.id, // Mirage automatically hooks up the userId relationship here
        place: "Paris",
        date: "2026-05-12",
        HH: "It's raining",
        img: [],
        images: [],
      });
      server.create("album", {
        userId: user2.id,
        place: "Vietnam",
        date: "2026-04-10",
        HH: "Such an Amazing trip. A bit humid, but the food, the historial landmarks and the beach made it all worth it.",
        img: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwNYw3WRpxb688RtSx0gOSyxgtvckI5Krj_LIcIfQKg&s=10",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOFgEAwVANXDlnqd4k3t3gEexDZWT7yUCG19YwXfXOg&s=10",
          "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/8e/7a/8e.jpg",
        ],
        images: [],
      });

      server.create("album", {
        userId: user1.id, // Mirage automatically hooks up the userId relationship here
        place: "Berlin",
        date: "2026-05-01",
        HH: "It's sunny",
        images: [],
      });
      server.create("album", {
        userId: user3.id, // Mirage automatically hooks up the userId relationship here
        place: "Paris",
        date: "2026-05-12",
        HH: "What a wonderful trip. I am grateful Holiday reviews it's so easy to set up.",
        img: [
          "https://st.depositphotos.com/1002969/3908/i/450/depositphotos_39086945-stock-photo-typical-parisian-cafe.jpg",
          "https://img.magnific.com/free-photo/cityscape-paris-sunlight-blue-sky-fra_181624-50289.jpg?semt=ais_hybrid&w=740&q=80",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7jE0P3KZkIKwwJMN5zAsU693FuUqLXroiefieJwJVM-npuVLahbaPGg&s=10",
        ],
        images: [],
      });
      server.create("album", {
        userId: user2.id, // Mirage automatically hooks up the userId relationship here
        place: "Paris",
        date: "2026-05-12",
        HH: "What a wonderful trip. I am grateful Holiday reviews it's so easy to set up.",
        img: [
          "https://st.depositphotos.com/1002969/3908/i/450/depositphotos_39086945-stock-photo-typical-parisian-cafe.jpg",
          "https://img.magnific.com/free-photo/cityscape-paris-sunlight-blue-sky-fra_181624-50289.jpg?semt=ais_hybrid&w=740&q=80",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7jE0P3KZkIKwwJMN5zAsU693FuUqLXroiefieJwJVM-npuVLahbaPGg&s=10",
        ],
        images: [],
      });
    },
    //form input
    routes() {
      this.namespace = "api";

      //password request

      this.post("/auth/login", (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody);

        // Look up the seeded user
        const user = schema.users.findBy({ email: email.toLowerCase() });

        if (user && user.password === password) {
          // Ensure you return an object with "token" and a nested "user" object!
          return {
            token: "fake-jwt-token-123",
            user: {
              id: user.id, // This passes data.user.id to your frontend
              name: user.name, // This passes data.user.name to your frontend
              email: user.email,
            },
          };
        }
        // Fallback for wrong credentials
        return new Response(401, {}, { error: "Invalid credentials" });
      });
      //get albums
      this.get("/user/:id/albums", (schema, request) => {
        // 1. Extract the ID string from the URL path variable
        let currentId = request.params.id;

        // 2. Convert it to a number to match your database seeds type
        let numericId = Number(currentId);

        // 3. Query the database using the clean numerical ID variable
        let userAlbums = schema.albums.where({ userId: numericId }).models;

        // 4. Return the payload wrapped inside the 'albums' key your frontend expects
        return {
          albums: userAlbums,
        };
      });

      this.post("/user/:id/albums", (schema, request) => {
        let currentId = request.params.id;

        // 🚨 FIX HERE: Convert to a Number before saving it to the database!
        let numericId = Number(currentId);

        let attrs = JSON.parse(request.requestBody);

        // Attach the clean numerical ID so the GET route can find it later
        attrs.userId = numericId;

        return schema.albums.create(attrs);
      });

      /* this.patch("/user/:id/albums", (schema, request) => {
        let id = request.params.id; // Get ID from URL
        let attrs = JSON.parse(request.requestBody); // Get data sent by frontend

        // Find the user in the mock database and update it
        let user = schema.users.find(id);
        return user.update(attrs);
      });*/

      this.delete("/user/:id/albums/:albumId", (schema, request) => {
        let albumId = request.params.albumId;

        // Busca el álbum en la base de datos de Mirage por su ID y lo elimina
        const album = schema.albums.find(albumId);
        if (album) {
          album.destroy(); // Elimina el registro de la memoria
          return {}; // Devuelve un objeto vacío con estado 200 OK
        }
        return new Response(404, {}, { errors: ["Álbum no encontrado"] });
      });

      this.passthrough((request) => !request.url.startsWith("/api"));
    },
  });
}
