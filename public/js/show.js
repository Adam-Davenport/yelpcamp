$('.edit').hover(
	function () {
		$(this).addClass('btn-warning')
	},
	function () {
		$(this).removeClass('btn-warning')
	}
)

$('.delete').hover(
	function () {
		$(this).addClass('btn-danger')
	},
	function () {
		$(this).removeClass('btn-danger')
	}
)