// allow the formatNumber function to be used as a filter
Vue.filter('formatCurrency', function (value) {
	return formatNumber(value, 0, '.', ',');
});

function formatNumber(n, c, d, t){
	var c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d === undefined ? '.' : d, 
		t = t === undefined ? ',' : t, 
		s = n < 0 ? '-' : '', 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, 'دج1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

// vue toast
Vue.use(VueToast);

// vue scroll to
VueScrollTo.setDefaults({
    container: 'body',
    duration: 700,
    easing: 'linear',
    offset: 50,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
});

// the shopping cart component
Vue.component('cart', {
	props: ['items'],
	computed: {
		Total() {
			let total = 0;
			this.items.forEach(item => {
				total += (item.price * item.quantity  );
			});
			return total;
		}
	},
	methods: {
		// remove item by index
		removeItem(index) {
			this.items.splice(index, 1);

			this.$toast.open({
				message: "تم إزالة المنتج",
				type: "success",
				duration: 4000,
				dismissible: true
			});
		}
	}
});

new Vue({
	el: '#app',
	computed: {
		total() {
			let total = 0;
			this.cartItems.forEach(item => {
				total += (item.price * item.quantity  );
			});
			return total + +this.wilayaPrice + +2600;
		}
	},
	data: {
		cartItems: [],
		items: products,
		currentFilter: 'all',
		wilayaPrice: 0,
	},
	methods: {
		// add items to cart
		addToCart(itemToAdd) {
			let found = false;
			// add the item or increase quantity
			let itemInCart = this.cartItems.filter(item => item.id===itemToAdd.id);
			let isItemInCart = itemInCart.length > 0;

			if (isItemInCart === false) {
				this.cartItems.push(Vue.util.extend({}, itemToAdd));

				this.$toast.open({
					message: "تم إضافة المنتج",
					type: "success",
					duration: 4000,
					dismissible: true
				});
			} else {
				itemInCart[0].quantity += itemToAdd.quantity ;
			}
			itemToAdd.quantity = 1;
		},
		// category filter
		setFilter(filter) {
			this.currentFilter = filter;
		}
	}
});


function submitState(el) {

    var $form = $(el),
        $requiredInputs = $form.find('input:required'),
        $submit = $form.find('input[type="submit"]');

    $submit.attr('disabled', 'disabled');

    $requiredInputs.keyup(function () {

      $form.data('empty', 'false');

      $requiredInputs.each(function() {
        if ($(this).val() === '') {
          $form.data('empty', 'true');
        }
      });

      if ($form.data('empty') === 'true') {
        $submit.attr('disabled', 'disabled').attr('title', 'fill in all required fields');
      } else {
        $submit.removeAttr('disabled').attr('title', 'click to submit');
      }
    });
  }
  // apply to each form element individually
  submitState('#sign_up_user');
  submitState('#login_user');