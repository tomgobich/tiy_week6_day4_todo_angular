(() => {

	'use strict';

	angular.module('app')
		.factory('FTask', function(FApi, FLocalStorage)
		{

			const LS_TASKLIST = 'taskList';

			const NewTask = function(task)
			{
				let newTask = {};
				
				newTask.id 				= Date.now() + Math.floor(Math.random() * (9999 - 1000) + 1000);
				newTask.task 			= task;
				newTask.isComplete 		= false;
				newTask.creationDate 	= Date.now();

				return newTask;
			}



			const getTaskList = function()
			{
				if(localStorage.getItem(LS_TASKLIST))
				{
					return FLocalStorage.get(LS_TASKLIST);
					// console.log(taskList);
				}

				return [];
			}



			const setTaskList = function(taskList)
			{
				FLocalStorage.set(LS_TASKLIST, taskList);
			}





			return {
				NewTask,
				getTaskList,
				setTaskList,
			}

		})
})();
