const getProd = (
  // URL of the data
  url = "frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1"
) => {
  getProdsAsync(url).then(data => push_prod(data));
};

async function getProdsAsync(url) {
  let response = await fetch(`https://${url}`);
  let data = await response.json();
  // console.log(data);
  return data;
}

const push_prod = ({ products, next_pg }) => {
  // What will be sent to the page
  let content = "";
  // Mold of each product recieved
  let html_cont = "";

  // console.log(products);
  if (products) {
    products.forEach(function(product) {
      // console.log(product);
      html_cont = `
                <div class="card">
                    <div class="card_img">
                        <img src="http:${product.image}"/>
                    </div>
                    <h2 class="card_name">${product.name}</h2>
                    <p class="card_desc">${product.description}</p>
                    <p class="card_oldPrice">De: R$${product.oldPrice.toFixed(
                      2
                    )}</p>
                    <h3 class="card_price">Por: R$${product.price.toFixed(
                      2
                    )}</h3>
                    <p class="card_quota">ou ${
                      product.installments.count
                    }x de R$${product.installments.value.toFixed(2)}</p>
                    <button class="card_but">Comprar</button>
                </div>
            `;

      content = content + html_cont;
    });
  }

  const cards = document.querySelector(".cards");
  cards.innerHTML += content;

  const cards_but = document.querySelector(".btn_products");
  cards_but.onclick = () => getProd(next_pg);
};

getProd();
