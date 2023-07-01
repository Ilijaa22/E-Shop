// Hvatanje dugmadi
const bar = document.getElementById('bar');
const nav = document.querySelector('ul');
const close = document.getElementById('close');
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Funkcija za uklanjanje proizvoda
    function removeProduct(event) {
    event.preventDefault();
    var row = event.target.closest('tr');
    row.remove();
    calculateTotal();
}
      
// Funkcija za izračunavanje ukupne cene
    function calculateTotal() {
    var rows = document.querySelectorAll('#cart-page tbody tr');
        var total = 0;
        rows.forEach(function (row) {
        var price = parseFloat(row.querySelector('.price').textContent.substring(1));
        var quantity = parseInt(row.querySelector('.quantity-input').value);
        var subtotal = price * quantity;
        row.querySelector('.subtotal').textContent = '$' + subtotal.toFixed(2);
        total += subtotal;
        });
        // Prikaz ukupne cene na željenom mestu na stranici
        var totalElement = document.getElementById('total');
        totalElement.textContent = '$' + total.toFixed(2);
    }
      
// Hvatanje event listenera na dugmad za uklanjanje proizvoda
    var removeButtons = document.getElementsByClassName('remove-btn');
     Array.from(removeButtons).forEach(function (button) {
     button.addEventListener('click', removeProduct);
    });
      
// Inicijalno izračunavanje ukupne cene
    calculateTotal();

// Funkcija za ažuriranje ukupne cene
  function updateTotal() {
    var subtotalElements = document.getElementsByClassName('subtotal');
    var totalElement = document.getElementById('total');
    var total = 0;

    Array.from(subtotalElements).forEach(function (subtotalElement) {
      var subtotal = parseFloat(subtotalElement.textContent.substring(1));
      total += subtotal;
    });

    var couponInput = document.querySelector('#kupon input[type="text"]');
    if (couponInput.value === 'cara') {
      total *= 0.9; // 10% popust
    }

    totalElement.textContent = '$' + total.toFixed(2);
  }

// Dodavanje event listenera na dugme za primenu kupona
    var applyCouponButton = document.querySelector('.apply-coupon');
    applyCouponButton.addEventListener('click', function () {
    updateTotal();
  });


// Hvatanje svih input elemenata sa klasom "quantity-input"
    var quantityInputs = document.querySelectorAll('.quantity-input');

    // Iteriranje kroz sve input elemente
    quantityInputs.forEach(function(input, index) {
        // Dodavanje event listenera na svaki input element
        input.addEventListener('change', function() {
            // Dohvatanje vrednosti iz input polja
            var quantity = parseInt(input.value);
            
            // Dohvatanje elementa za prikaz subtotala
            var subtotalElement = document.getElementById('subtotal-' + (index + 1));
            
            // Dohvatanje cene iz susednog elementa
            var priceElement = input.parentElement.nextElementSibling;
            var price = parseFloat(priceElement.innerText.replace('$', ''));
            
            // Računanje subtotala
            var subtotal = quantity * price;
            
            // Ažuriranje vrednosti subtotala
            subtotalElement.innerText = '$' + subtotal.toFixed(2);
        });
    });

$(document).ready(function() {
// Funkcija za povećanje proizvoda
    function increaseProduct(id) {
        var quantityInput = $('#quantity-input-' + id);
        var quantity = parseInt(quantityInput.val());
        quantity++;
        quantityInput.val(quantity);

        calculateSubtotal(id);
    }

// Funkcija za izračunavanje subtotala
    function calculateSubtotal(id) {
        var quantity = parseInt($('#quantity-input-' + id).val());
        var price = parseFloat($('#subtotal-' + id).closest('tr').find('.price').text().replace('$', ''));
        var subtotal = quantity * price;
        $('#subtotal-' + id).text('$' + subtotal.toFixed(2));

        calculateTotal();
    }

// Funkcija za izračunavanje ukupne cene
    function calculateTotal() {
        var total = 0;
        $('.subtotal').each(function() {
            var subtotal = parseFloat($(this).text().replace('$', ''));
            total += subtotal;
        });
        $('#total').text('$' + total.toFixed(2));
    }

// Dodavanje event handlera na dugme za unos
    $('.quantity-input').on('change', function() {
        var id = $(this).attr('id').split('-')[2];
        calculateSubtotal(id);
    });

// Dodavanje event handlera na dugme za povećanje
    $('.increase-btn').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('id').split('-')[2];
        increaseProduct(id);
    });
});