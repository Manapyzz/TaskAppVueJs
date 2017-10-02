{

	const TaskList = {
		props: [ 'task' ],
		template: 
			`
				<li class="collection-item">
	            	<input type="checkbox" v-bind:id="'t_' + task.id" v-model="task.done" v-on:change="refreshList()">
	            	<label v-bind:for="'t_' + task.id">{{ task.title }}</label>
	            	<a href="#" v-on:click="removeTask(task)" class="link-delete" title="Supprimer cette tâche">
	                	<i class="small material-icons">delete_forever</i>
            		</a>
    			</li> 
			`,
		methods: {
			removeTask : function(task) {
				this.$emit('remove-task', task)
			},
			refreshList : function() {
				this.$emit('refresh-list')
			}
		}
	}

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
			},
			removeTask(task) {
				var pos = this.tasks.indexOf(task);
				this.tasks.splice(pos, 1);
				this.refreshList();
			},
			getUndoneTask() {
				return this.tasks.filter((task) => !task.done).length;
			}
		},

		filters: {
			pluralize: function(value, word) {
				return value > 1 ? value + ' ' + word + 's' : value  + ' ' + word;
			}
		},

		components: {
			'task-list' : TaskList
		}
	});
}