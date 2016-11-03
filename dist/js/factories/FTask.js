'use strict';

(function () {

	'use strict';

	angular.module('app').factory('FTask', function (FApi, FLocalStorage) {

		var LS_TASKLIST = 'taskList';

		var NewTask = function NewTask(task) {
			var newTask = {};

			newTask.id = Date.now() + Math.floor(Math.random() * (9999 - 1000) + 1000);
			newTask.task = task;
			newTask.isComplete = false;
			newTask.creationDate = Date.now();

			return newTask;
		};

		var getTaskList = function getTaskList() {
			if (localStorage.getItem(LS_TASKLIST)) {
				return FLocalStorage.get(LS_TASKLIST);
				// console.log(taskList);
			}

			return [];
		};

		var setTaskList = function setTaskList(taskList) {
			FLocalStorage.set(LS_TASKLIST, taskList);
		};

		return {
			NewTask: NewTask,
			getTaskList: getTaskList,
			setTaskList: setTaskList
		};
	});
})();