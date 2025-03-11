describe("E2E: Shopping Cart and Checkout", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173"); // Đảm bảo app đang chạy
    });
  
    it("should add an item to the cart", () => {
      cy.get(".product-card").first().within(() => {
        cy.contains("Add to Cart").click(); // Nhấn nút "Add to Cart"
      });
  
      cy.get(".cart-count").should("contain", "1"); // Kiểm tra số lượng sản phẩm trong giỏ hàng
    });
  
    it("should navigate to the cart and proceed to checkout", () => {
      cy.get(".cart-icon").click(); // Click vào biểu tượng giỏ hàng
      cy.url().should("include", "/cart");
  
      cy.contains("Proceed to Checkout").click(); // Nhấn nút "Proceed to Checkout"
      cy.url().should("include", "/checkout");
  
      cy.get("input[name='name']").type("John Doe"); // Điền thông tin người mua
      cy.get("input[name='email']").type("johndoe@example.com");
  
      cy.contains("Place Order").click(); // Nhấn nút đặt hàng
      cy.contains("Order Confirmed").should("be.visible"); // Kiểm tra xác nhận đơn hàng
    });
  });
  