$(document).ready(function () {
	buttonHover('.edit' ,'btn-warning')
	buttonHover('.delete', 'btn-danger')
}
)

function buttonHover(button, change){
	$(button).hover(
		function () {
			$(button).addClass(change)
		},
		function () {
			$(button).removeClass(change)
		}
	)
}
