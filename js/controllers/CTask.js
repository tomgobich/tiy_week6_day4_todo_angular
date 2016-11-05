'use strict';

(function () {

	'use strict';

	angular.module('app').controller('CTask', function (FTask) {

		var vm = this;

		var FILTER_ALL = '';
		var FILTER_CURRENT = '!true';
		var FILTER_COMPLETED = 'true';

		var NAV_ALL_INDEX = 0;
		var NAV_CURRENT_INDEX = 1;
		var NAV_COMPLETED_INDEX = 2;

		// ------------------------------------------------------------
		// Name: changeActiveNavigation
		// Abstract: Change the active navigation element
		// ------------------------------------------------------------
		vm.changeActiveNavigation = function (navItem) {
			// Set navItem as new active
			vm.activeNavigation = navItem;

			// Update content filter
			vm.isCompleteFilter = vm.setTaskView(navItem);

			// Save active navigation item in localStorage
			FTask.setActiveNavigation(vm.activeNavigation);

			// Get new page message
			vm.taskMessage = vm.getTaskMessage();
		};

		// ------------------------------------------------------------
		// Name: setTaskView
		// Abstract: Set content to display based off active navItem
		// ------------------------------------------------------------
		vm.setTaskView = function (navItem) {
			// Default to all
			var filter = FILTER_ALL;

			switch (navItem.name) {
				// Display active tasks
				case vm.navigationItems[NAV_CURRENT_INDEX].name:
					filter = FILTER_CURRENT;
					break;
				// Display completed tasks
				case vm.navigationItems[NAV_COMPLETED_INDEX].name:
					filter = FILTER_COMPLETED;
					break;
			}

			// Return filter
			return filter;
		};

		// ------------------------------------------------------------
		// Name: addNewTask
		// Abstract: Adds a new task to the taskList array
		// ------------------------------------------------------------
		vm.addNewTask = function (isValid, formName) {
			// Valid data entered?
			if (isValid) {
				// Yes, create new task object
				vm.newTask = FTask.NewTask(vm.task);

				// Push new task to taskList array
				vm.taskList.push(vm.newTask);

				// Update the task list dependant data
				vm.updateTaskList();

				// Reset task field
				vm.task = '';
			} else {
				// No, warn the user
				$.notify('Tasks must be at least 3 characters long, please try again.');
			}
		};

		// ------------------------------------------------------------
		// Name: updateTaskList
		// Abstract: Updates taskList dependant data and save in localStorage
		// ------------------------------------------------------------
		vm.updateTaskList = function (state) {
			// Is this being called on load?
			if (state !== 'load') {
				// No, save in localStorage
				FTask.setTaskList(vm.taskList);
			} else {
				// Get the taskList from localStorage
				vm.taskList = FTask.getTaskList();
			}

			// Update counts
			vm.navigationItems[NAV_ALL_INDEX].count = vm.taskList.length;
			vm.navigationItems[NAV_CURRENT_INDEX].count = vm.getTaskCount(vm.navigationItems[NAV_CURRENT_INDEX].name);
			vm.navigationItems[NAV_COMPLETED_INDEX].count = vm.getTaskCount(vm.navigationItems[NAV_COMPLETED_INDEX].name);

			// Update page message
			vm.taskMessage = vm.getTaskMessage();
		};

		// ------------------------------------------------------------
		// Name: removeTask
		// Abstract: Sets task as removed in taskList array
		// ------------------------------------------------------------
		vm.removeTask = function (taskItem) {
			// Save taskItem to allow undo of deletion
			vm.lastRemovedTask = taskItem;

			// Removes from the taskList array
			vm.taskList = _.pull(vm.taskList, taskItem);

			// Updates taskList dependant data
			vm.updateTaskList();
		};

		// ------------------------------------------------------------
		// Name: undoLastDelete
		// Abstract: Add the last deleted item back onto the taskList
		// ------------------------------------------------------------
		vm.undoLastDelete = function () {
			if (vm.lastRemovedTask.length > 1) {
				// Concatenate onto array
				vm.taskList = vm.taskList.concat(vm.lastRemovedTask);
			} else {
				// Push onto array
				vm.taskList.push(vm.lastRemovedTask);
			}

			// Clear lastRemovedTask variable
			vm.lastRemovedTask = null;

			// Updates taskList dependant data
			vm.updateTaskList();
		};

		// ------------------------------------------------------------
		// Name: clearAllCompleted
		// Abstract: Clears all completed tasks
		// ------------------------------------------------------------
		vm.clearAllCompleted = function () {
			vm.lastRemovedTask = _.remove(vm.taskList, function (element) {
				return element.isComplete == true;
			});

			// Clear all completed tasks
			vm.taskList = _.remove(vm.taskList, function (element) {
				return element.isComplete == false;
			});

			// Update taskList dependant data
			vm.updateTaskList();
		};

		// ------------------------------------------------------------
		// Name: toggleIsComplete
		// Abstract: Toggles task completion status
		// ------------------------------------------------------------
		vm.toggleIsComplete = function (taskItem) {
			// Was item previously completed?
			if (taskItem.isComplete) {
				// Yes, change to active
				taskItem.isComplete = false;
			} else {
				// No, change to completed
				taskItem.isComplete = true;
			}

			// Update taskList dependant data
			vm.updateTaskList();
		};

		// ------------------------------------------------------------
		// Name: getTaskCount
		// Abstract: Gets a task count for task status passed in
		// ------------------------------------------------------------
		vm.getTaskCount = function (taskStatus) {
			var taskArray = vm.taskList.slice(),
			    taskCount = void 0;

			switch (taskStatus) {
				// Get array of active tasks
				case 'Current':
					taskCount = _.remove(taskArray, function (element) {
						return element.isComplete == false;
					});
					break;
				// Get array of completed tasks
				case 'Completed':
					taskCount = _.remove(taskArray, function (element) {
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
		};

		// ------------------------------------------------------------
		// Name: getTaskMessage
		// Abstract: Get appropriate message based off task data
		// ------------------------------------------------------------
		vm.getTaskMessage = function () {
			//		 1 Current task
			//	AND  All OR Current active navigation
			if (vm.navigationItems[NAV_CURRENT_INDEX].count === 1 && vm.activeNavigation.name === vm.navigationItems[NAV_ALL_INDEX].name || vm.navigationItems[NAV_CURRENT_INDEX].count === 1 && vm.activeNavigation.name === vm.navigationItems[NAV_CURRENT_INDEX].name) {
				return 'You have ' + vm.navigationItems[NAV_CURRENT_INDEX].count + ' task to crush!';
			}

			//		 > 1 Current task
			//	AND  All OR Current active navigation
			else if (vm.navigationItems[NAV_CURRENT_INDEX].count > 1 && vm.activeNavigation.name === vm.navigationItems[NAV_ALL_INDEX].name || vm.navigationItems[NAV_CURRENT_INDEX].count > 1 && vm.activeNavigation.name === vm.navigationItems[NAV_CURRENT_INDEX].name) {
					return 'You have ' + vm.navigationItems[NAV_CURRENT_INDEX].count + ' tasks to crush!';
				}

				//		 < 1 Current task
				//	AND  All OR Current active navigation
				//	AND  >= 1 All task count
				else if (vm.navigationItems[NAV_CURRENT_INDEX].count < 1 && vm.activeNavigation.name === vm.navigationItems[NAV_ALL_INDEX].name && vm.navigationItems[NAV_ALL_INDEX].count >= 1 || vm.navigationItems[NAV_CURRENT_INDEX].count < 1 && vm.activeNavigation.name === vm.navigationItems[NAV_CURRENT_INDEX].name && vm.navigationItems[NAV_ALL_INDEX].count >= 1) {
						return 'You crushed all ' + vm.navigationItems[NAV_ALL_INDEX].count + ' of your tasks! Add more below!';
					}

					// 		 1 Completed task
					// AND   Completed active navigation
					else if (vm.navigationItems[NAV_COMPLETED_INDEX].count === 1 && vm.activeNavigation.name === vm.navigationItems[NAV_COMPLETED_INDEX].name) {
							return 'You\'ve crushed ' + vm.navigationItems[NAV_COMPLETED_INDEX].count + ' task, keep it up!';
						}

						//		 > 1 Completed task
						// AND   Completed active navigation
						else if (vm.navigationItems[NAV_COMPLETED_INDEX].count > 1 && vm.activeNavigation.name === vm.navigationItems[NAV_COMPLETED_INDEX].name) {
								return 'You\'ve crushed ' + vm.navigationItems[NAV_COMPLETED_INDEX].count + ' tasks, nice!';
							}

							//		 < 1 Completed task
							// AND   Completed active navigation
							// AND   >= 1 All task count
							else if (vm.navigationItems[NAV_COMPLETED_INDEX].count < 1 && vm.activeNavigation.name === vm.navigationItems[NAV_COMPLETED_INDEX].name && vm.navigationItems[NAV_ALL_INDEX].count >= 1) {
									return 'You haven\'t crushed any tasks yet, get crackin!';
								}

								// 		 Default
								else {
										return 'Don\'t let your day be a doosy, add a task below!';
									}
		};

		// Navigation items
		// 		- Counts get added in updatedTaskList call
		vm.navigationItems = [{
			name: 'All'
		}, {
			name: 'Current'
		}, {
			name: 'Completed'
		}];

		// View removed toggle
		vm.lastRemovedTask = null;

		// Get active navigation
		vm.activeNavigation = FTask.getActiveNavigation();

		// Get content filter for task list
		vm.isCompleteFilter = vm.setTaskView(vm.activeNavigation);

		// Gets taskList and updates the data dependant on it
		vm.updateTaskList('load');
	});
})();