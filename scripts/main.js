{
	let vm = new Vue({
		el : '#app',
		data: {
			taskTitle: '',
			tasks : JSON.parse(localStorage.getItem('tasks')) || []
		},

		methods: {
			refreshList() {
				localStorage.setItem('tasks', JSON.stringify(this.tasks));
			},
			addTask() {

				var lastId = -1;

				if (this.tasks.length !== 0) {
					lastId = this.tasks[this.tasks.length-1].id;
				}

				this.tasks.push({ id: lastId + 1, title: this.taskTitle, done: false })
				this.taskTitle = "";
				this.refreshList();
			}
		}
	});
}