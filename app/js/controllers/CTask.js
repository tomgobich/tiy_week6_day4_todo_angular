(() => {

	'use strict';

	angular.module('app')
		.controller('CTask', function(FTask)
		{

			let vm = this;

			const FILTER_ALL 		= '';
			const FILTER_ACTIVE		= '!true';
			const FILTER_COMPLETED	= 'true';



			// ------------------------------------------------------------
			// Name: changeActiveNavigation
			// Abstract: Change the active navigation element
			// ------------------------------------------------------------
			vm.changeActiveNavigation = function(navItem)
			{
				// Set navItem as new active
				vm.activeNavigation = navItem;

				// Update content filter
				vm.isCompleteFilter = vm.setTaskView(navItem);

				// Save active navigation item in localStorage
				FTask.setActiveNavigation(vm.activeNavigation);

				// Get new page message
				vm.taskMessage = vm.getTaskMessage();
			}



			// ------------------------------------------------------------
			// Name: setTaskView
			// Abstract: Set content to display based off active navItem
			// ------------------------------------------------------------
			vm.setTaskView = function(navItem)
			{
				// Default to all
				let filter = FILTER_ALL;

				switch(navItem)
				{
					// Display active tasks
					case vm.navigationItems[1]:
						filter = FILTER_ACTIVE;
						break;
					// Display completed tasks
					case vm.navigationItems[2]:
						filter = FILTER_COMPLETED;
						break;
				}

				// Return filter
				return filter;
			}



			// ------------------------------------------------------------
			// Name: addNewTask
			// Abstract: Adds a new task to the taskList array
			// ------------------------------------------------------------
			vm.addNewTask = function(isValid, formName)
			{
				// Valid data entered?
				if(isValid)
				{
					// Yes, create new task object
					vm.newTask = FTask.NewTask(vm.task);

					// Push new task to taskList array
					vm.taskList.push(vm.newTask);

					// Update the task list dependant data
					vm.updateTaskList();

					// Reset task field
					vm.task = '';
				}
				else
				{
					// No, warn the user
					$.notify('Tasks must be at least 3 characters long, please try again.')
				}
			}



			// ------------------------------------------------------------
			// Name: updateTaskList
			// Abstract: Updates taskList dependant data and save in localStorage
			// ------------------------------------------------------------
			vm.updateTaskList = function()
			{
				// Save in localStorage
				FTask.setTaskList(vm.taskList);

				// Update counts
				vm.allTaskCount			= vm.taskList.length;
				vm.activeTaskCount 		= vm.getTaskCount(vm.navigationItems[1]);
				vm.completedTaskCount 	= vm.getTaskCount(vm.navigationItems[2]);

				// Update page message
				vm.taskMessage			= vm.getTaskMessage();
			}



			// ------------------------------------------------------------
			// Name: removeTask
			// Abstract: Removes a task from the tasklist Array
			// ------------------------------------------------------------
			vm.removeTask = function(taskItem)
			{
				// Removes from the taskList array
				vm.taskList = _.pull(vm.taskList, taskItem);

				// Updates taskList dependant data
				vm.updateTaskList();

			}



			// ------------------------------------------------------------
			// Name: clearAllCompleted
			// Abstract: Clears all completed tasks
			// ------------------------------------------------------------
			vm.clearAllCompleted = function()
			{
				// Clear all completed tasks
				vm.taskList = _.remove(vm.taskList, function(element) {
				  return element.isComplete == false;
				});

				// Update taskList dependant data
				vm.updateTaskList();
			}



			// ------------------------------------------------------------
			// Name: toggleIsComplete
			// Abstract: Toggles task completion status
			// ------------------------------------------------------------
			vm.toggleIsComplete = function(taskItem)
			{
				// Was item previously completed?
				if(taskItem.isComplete)
				{
					// Yes, change to active
					taskItem.isComplete = false;
				}
				else
				{
					// No, change to completed
					taskItem.isComplete = true;
				}

				// Update taskList dependant data
				vm.updateTaskList();
			}



			// ------------------------------------------------------------
			// Name: getTaskCount
			// Abstract: Gets a task count for task status passed in
			// ------------------------------------------------------------
			vm.getTaskCount = function(taskStatus)
			{
				let taskArray = vm.taskList.slice(),
					taskCount;

				switch(taskStatus)
				{
					// Get array of active tasks
					case vm.navigationItems[1]:
						taskCount = _.remove(taskArray, function(element) {
						  return element.isComplete == false;
						});
						break;
					// Get array of completed tasks
					case vm.navigationItems[2]:
						taskCount = _.remove(taskArray, function(element) {
						  return element.isComplete == true;
						});
						break;
					// Use all tasks by default
					default:
						taskCount = taskArray;
						break;
				}

				// Return length of new array
				return taskCount.length;
			}



			// ------------------------------------------------------------
			// Name: getTaskMessage
			// Abstract: Get appropriate message based off task data
			// ------------------------------------------------------------
			vm.getTaskMessage = function()
			{
				//		 1 active task					AND active navigation is All or Active
				if( 	 vm.activeTaskCount === 1 		&& 	vm.activeNavigation === vm.navigationItems[0] ||
						 vm.activeTaskCount === 1 		&& 	vm.activeNavigation === vm.navigationItems[1])
				{
					return `You have ${ vm.activeTaskCount } task to crush!`;
				}
				//		 > 1 active task				AND active navigation is All or Active
				else if( vm.activeTaskCount > 1 		&& 	vm.activeNavigation === vm.navigationItems[0] ||
						 vm.activeTaskCount > 1 		&& 	vm.activeNavigation === vm.navigationItems[1])
				{
					return `You have ${ vm.activeTaskCount } tasks to crush!`;
				}
				//		 < 1 active task				AND active navigation is All or Active			  AND >= 1 task overall
				else if( vm.activeTaskCount < 1 		&& 	vm.activeNavigation === vm.navigationItems[0] && vm.allTaskCount >= 1 ||
						 vm.activeTaskCount < 1 		&& 	vm.activeNavigation === vm.navigationItems[1] && vm.allTaskCount >= 1)
				{
					return `You crushed all ${vm.allTaskCount} of your tasks! Add more below!`;
				}
				// 		 1 completed task				AND active navigation is completed
				else if( vm.completedTaskCount === 1 	&& 	vm.activeNavigation === vm.navigationItems[2])
				{
					return `You've crushed ${vm.completedTaskCount} task, keep it up!`;
				}
				//		 > 1 completed task				AND active navigation is completed
				else if( vm.completedTaskCount > 1 		&& 	vm.activeNavigation === vm.navigationItems[2])
				{
					return `You've crushed ${vm.completedTaskCount} tasks, nice!`;
				}
				//		 < 1 completed task				AND active naviation is completed				  AND >= 1 task overall
				else if( vm.completedTaskCount < 1 		&& 	vm.activeNavigation === vm.navigationItems[2] && vm.allTaskCount >= 1)
				{
					return `You haven't crushed any tasks yet, get crackin!`;
				}
				// 		 Default
				else
				{
					return `Add a new task below to get started!`;
				}
			}


			// Navigation items
			vm.navigationItems 		= ['All', 'Current', 'Completed'];

			// Get active navigation
			vm.activeNavigation 	= FTask.getActiveNavigation();

			// Get content filter for task list
			vm.isCompleteFilter 	= vm.setTaskView(vm.activeNavigation);

			// Get task list
			vm.taskList 			= FTask.getTaskList();

			// Get task status counts
			vm.allTaskCount			= vm.taskList.length;
			vm.activeTaskCount 		= vm.getTaskCount(vm.navigationItems[1]);
			vm.completedTaskCount 	= vm.getTaskCount(vm.navigationItems[2]);

			// Get page message
			vm.taskMessage			= vm.getTaskMessage();



		})

})();
