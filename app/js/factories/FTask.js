(() => {

	'use strict';

	angular.module('app')
		.factory('FTask', function(FLocalStorage)
		{

			const LS_TASKLIST 			= 'taskList';
			const LS_TASKVIEW 			= 'taskView';
			const LS_ACTIVE_NAVIGATION 	= 'activeNavigation';



			// ------------------------------------------------------------
			// Name: getActiveNavigation
			// Abstract: Gets active navigation from localStorage OR
			//			 Sets default active navigation
			// ------------------------------------------------------------
			const getActiveNavigation = function()
			{
				// activeNavigation in localStorage?
				if(localStorage.getItem(LS_ACTIVE_NAVIGATION))
				{
					// Yes, return that data
					return FLocalStorage.get(LS_ACTIVE_NAVIGATION);
				}

				// else default to all
				return 'All';
			}



			// ------------------------------------------------------------
			// Name: setActiveNavigation
			// Abstract: Saves active navigation selection in localStorage
			// ------------------------------------------------------------
			const setActiveNavigation = function(activeNavigation)
			{
				FLocalStorage.set(LS_ACTIVE_NAVIGATION, activeNavigation);
			}



			// ------------------------------------------------------------
			// Name: NewTask
			// Abstract: Constructor-like function that stubs a newTask object
			// ------------------------------------------------------------
			const NewTask = function(task)
			{
				// Create newTask
				let newTask = {};

				// Load it with the data
				newTask.id 				= Date.now() + Math.floor(Math.random() * (9999 - 1000) + 1000);
				newTask.task 			= task;
				newTask.isComplete 		= false;
				newTask.creationDate 	= Date.now();

				// Return the new object
				return newTask;
			}



			// ------------------------------------------------------------
			// Name: getTaskList
			// Abstract: Gets taskList from localStorage
			// ------------------------------------------------------------
			const getTaskList = function()
			{
				// taskList in localStorage?
				if(localStorage.getItem(LS_TASKLIST))
				{
					// Yes, return that data
					return FLocalStorage.get(LS_TASKLIST);
				}

				// Else default to empty array
				return [];
			}



			// ------------------------------------------------------------
			// Name: setTaskList
			// Abstract: Saves taskList in localStorage
			// ------------------------------------------------------------
			const setTaskList = function(taskList)
			{
				FLocalStorage.set(LS_TASKLIST, taskList);
			}





			return {
				getActiveNavigation,
				setActiveNavigation,
				NewTask,
				getTaskList,
				setTaskList,
			}

		})
})();
