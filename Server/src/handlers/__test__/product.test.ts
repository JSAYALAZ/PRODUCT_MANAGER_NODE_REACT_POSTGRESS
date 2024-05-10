import request from "supertest";
import server from "../../server";


describe("POST /api/products/", () => {
  test("Should display validation errors", async () => {
    const response = await request(server).post("/api/products/").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errores");
    expect(response.body.errores).toHaveLength(5);
    expect(response.status).not.toBe(201);
  });

  test("Should display validation errors on price is higher than 0", async () => {
    const response = await request(server).post("/api/products/").send({
      name: "Airpods pro v4",
      price: "hola",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errores");
    expect(response.body.errores).toHaveLength(2);
    expect(response.status).not.toBe(201);
  });

  test("Should register a new product, return id", async () => {
    const response = await request(server).post("/api/products/").send({
      name: "Xiaomi buds 3T pro - testing",
      price: 160.0,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("GET /api/products", () => {
  test("Should check if the url solicited exist", async () => {
    const response = await request(server).get("/api/products/");
    expect(response.status).not.toBe(404);
  });

  test("SHOULD SEND BACK A LIST OF THE PRODUCTS", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("productos");

    expect(response.body).not.toHaveProperty("errores");
    expect(response.status).not.toBe(404);
  });
});

describe("GET /api/products/:id", () => {
  test("Should return a status 404 if the product dont exist", async () => {
    const productId = 999;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
  });

  test("Should check if ID provided is valid", async () => {
    const productId = "hola";
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.body).toHaveProperty("errores");
    expect(response.status).toBe(400);
    expect(response.body.errores[0].msg).toBe("Id no valido");
  });
  test("Should obtain the atributtes of the products into a json", async () => {
    const response = await request(server).get(`/api/products/1`);
    expect(response.body).toHaveProperty("product");
    expect(response.status).toBe(200);
    expect(response.body.product).toHaveLength(1);
  });
});

describe("PUT /api/products/:id", () => {
  test("Should display validation error messages when update a product", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errores");
    expect(response.body.errores).toBeTruthy();
    expect(response.body.errores).toHaveLength(5);

    expect(response.status).not.toBe(200);
  });

  test("Should validate that the price is greater than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor benq actualizado",
      availability: true,
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errores");
    expect(response.body.errores).toBeTruthy();
    expect(response.body.errores).toHaveLength(1);

    expect(response.status).not.toBe(200);
  });

  test("Should check if ID provided is valid", async () => {
    const productId = "hola";
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor benq actualizado",
        availability: true,
        price: 435,
      });
    expect(response.body).toHaveProperty("errores");
    expect(response.status).toBe(400);
    expect(response.body.errores[0].msg).toBe("ID non-valid");
  });

  test("Should check if the product exist", async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor benq actualizado",
        availability: true,
        price: 435,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
    expect(response.status).not.toBe(200);
  });
  test("Should update an existing product", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor benq actualizado - 2v",
        availability: true,
        price: 435,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("PATCH /api/products/:id",()=>{
  test('Should return a 404 response for a non-existing products', async()=>{
    const productId=999;
    const response = await request(server).patch(`/api/products/${productId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Producto no encontrado')

    expect(response.status).not.toBe(200);
    
  })
  test('Should update the product availability', async()=>{
    const productId=1;
    const response = await request(server).patch(`/api/products/${productId}`)
                        .send({

                        })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data.availability).toBe(false)

    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty('error')
    expect(response.body.error).not.toBe('Producto no encontrado')
  })
})

describe("DELETE /api/products/:id", () => {
  test("Should validate id is a number", async () => {
    const response = await request(server).delete("/api/products/abc");
    expect(response.body).toHaveProperty("errores");
    expect(response.status).toBe(400);
    expect(response.body.errores[0].msg).toBe("Id no valido");
  });

  test("Should return a 404 error when trying to delete a non-existing product", async () => {
    const response = await request(server).delete("/api/products/999999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });

  // test("Should delete an existing product", async () => {
  //   const productId = 4;
  //   let response = await request(server).delete(`/api/products/${productId}`);
  //   expect(response.body).toHaveProperty("data");
  //   expect(response.body.data).toEqual(`Producto eliminado`);
  //   expect(response.status).toBe(200);

  //   // Verificar que efectivamente se elimina en la base de datos
  //   response = await request(server).get(`/api/products/${productId}`);
  //   expect(response.body).toHaveProperty("error");
  //   expect(response.status).toBe(404);
  // });
});

