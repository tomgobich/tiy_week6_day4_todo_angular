(() => {

	'use strict';

	angular.module('app')
		.controller('CTask', function(FTask)
		{

			let vm = this;

			vm.taskList = FTask.getTaskList();


			vm.addNewTask = function(isValid, formName)
			{
				if(isValid)
				{
					vm.newTask = FTask.NewTask(vm.task);

					vm.taskList.push(vm.newTask);

					FTask.setTaskList(vm.taskList);

					vm.task = '';
				}
				else
				{
					$.notify('Tasks must be at least 3 characters long, please try again.')
				}
			}



			vm.updateTaskList = function()
			{
				FTask.setTaskList(vm.taskList);
			}



			vm.removeTask = function(taskItem)
			{
				vm.taskList = _.pull(vm.taskList, taskItem);
				vm.updateTaskList();
			}



			vm.toggleIsComplete = function(taskItem)
			{
				if(taskItem.isComplete)
				{
					taskItem.isComplete = false;
				}
				else
				{
					taskItem.isComplete = true;
				}
			}


		})

})();
