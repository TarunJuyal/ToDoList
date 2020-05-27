// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAvJBZuvslRa-hxQ-KJ4eBgZ64U9M9oAT8",
  authDomain: "to-do-task-51f1d.firebaseapp.com",
  databaseURL: "https://to-do-task-51f1d.firebaseio.com",
  projectId: "to-do-task-51f1d",
  storageBucket: "to-do-task-51f1d.appspot.com",
  messagingSenderId: "861222931880",
  appId: "1:861222931880:web:7e89317b83a608765e619d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function addTask() {
  var inputBox = document.querySelector("#inputBox");
  var inputDate = document.querySelector("#inputDate");
  if (inputBox.value && inputDate.value) {
    var key = firebase.database().ref().child("unfinishedTask").push().key;
    var task = { task: inputBox.value, date: inputDate.value, key: key };
    var updates = {};
    updates["/unfinishedTask/" + key] = task;
    firebase.database().ref().update(updates);
    createUnfinishedTask();
  }
}

function createUnfinishedTask() {
  var unfinishedTaskContainer = document.getElementsByClassName("container")[0];
  unfinishedTaskContainer.innerHTML = "";
  var taskArray = [];
  firebase
    .database()
    .ref("unfinishedTask")
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        taskArray.push(Object.values(childData));
      });
      var i;
      for (i = 0; i < taskArray.length; i++) {
        var taskDate = taskArray[i][0];
        var key = taskArray[i][1];
        var task = taskArray[i][2];

        taskContainer = document.createElement("div");
        taskContainer.setAttribute("class", "taskContainer");
        taskContainer.setAttribute("dataKey", key);

        var taskData = document.createElement("div");
        taskData.setAttribute("id", "taskData");

        var title = document.createElement("p");
        title.setAttribute("id", "taskTitle");
        title.setAttribute("contenteditable", "false");
        title.innerHTML = task;

        var date = document.createElement("p");
        date.setAttribute("id", "taskDate");
        date.setAttribute("contenteditable", "false");
        date.innerHTML = taskDate;

        var taskTool = document.createElement("div");
        taskTool.setAttribute("id", "taskTool");

        var taskDone = document.createElement("button");
        taskDone.setAttribute("id", "taskDone");
        taskDone.setAttribute(
          "onclick",
          "taskDone(this.parentElement.parentElement,this.parentElement)"
        );
        var faDone = document.createElement("i");
        faDone.setAttribute("class", "fa fa-check");

        var taskEdit = document.createElement("button");
        taskEdit.setAttribute("id", "taskEdit");
        taskEdit.setAttribute(
          "onclick",
          "taskEdit(this.parentElement.parentElement,this)"
        );
        var faEdit = document.createElement("i");
        faEdit.setAttribute("class", "fa fa-pencil");

        var taskDelete = document.createElement("button");
        taskDelete.setAttribute("id", "taskDelete");
        taskDelete.setAttribute(
          "onclick",
          "taskDelete(this.parentElement.parentElement)"
        );
        var faDelete = document.createElement("i");
        faDelete.setAttribute("class", "fa fa-trash");

        unfinishedTaskContainer.append(taskContainer);

        taskContainer.append(taskData);
        taskData.append(title);
        taskData.append(date);

        taskContainer.append(taskTool);
        taskTool.append(taskDone);
        taskDone.append(faDone);
        taskTool.append(taskEdit);
        taskEdit.append(faEdit);
        taskTool.append(taskDelete);
        taskDelete.append(faDelete);
      }
    });
}

function taskDone(task, taskTool) {
  finishedTaskContainer = document.getElementsByClassName("container")[1];
  task.removeChild(taskTool);
  finishedTaskContainer.append(task);
  var key = task.getAttribute("dataKey");
  console.log(key);
  var taskObj = {
    task: task.childNodes[0].childNodes[0].innerHTML,
    date: task.childNodes[0].childNodes[1].innerHTML,
    key: key,
  };
  var updates = {};
  updates["/finishedTask/" + key] = taskObj;
  firebase.database().ref().update(updates);
  taskDelete(task);
  createFinishedTask();
}

function finishEdit(editButton, task) {
  editButton.setAttribute("id", "taskEdit");
  editButton.setAttribute(
    "onclick",
    "taskEdit(this,this.parentElement.parentElement)"
  );

  title = task.childNodes[0].childNodes[0];
  title.setAttribute("contenteditable", false);

  date = task.childNodes[0].childNodes[1];
  date.setAttribute("contenteditable", false);

  var key = task.getAttribute("dataKey");
  console.log(key);
  var taskObj = {
    task: task.childNodes[0].childNodes[0].innerHTML,
    date: task.childNodes[0].childNodes[1].innerHTML,
    key: key,
  };
  var updates = {};
  updates["/unfinishedTask/" + key] = taskObj;
  firebase.database().ref().update(updates);
}

function taskEdit(task, editButton) {
  editButton.setAttribute("id", "taskEditing");
  editButton.setAttribute(
    "onclick",
    "finishEdit(this,this.parentElement.parentElement)"
  );
  title = task.childNodes[0].childNodes[0];
  title.setAttribute("contenteditable", true);

  date = task.childNodes[0].childNodes[1];
  date.setAttribute("contenteditable", true);
}

function taskDelete(task) {
  var key = task.getAttribute("dataKey");
  console.log(key);
  var taskToRemove = firebase.database().ref("unfinishedTask/" + key);
  taskToRemove.remove();

  task.remove();
}

function createFinishedTask() {
  var finishedTaskContainer = document.getElementsByClassName("container")[1];
  finishedTaskContainer.innerHTML = "";
  var taskArray = [];
  firebase
    .database()
    .ref("finishedTask")
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        taskArray.push(Object.values(childData));
      });
      var i;
      for (i = 0; i < taskArray.length; i++) {
        var taskDate = taskArray[i][0];
        var key = taskArray[i][1];
        var task = taskArray[i][2];

        taskContainer = document.createElement("div");
        taskContainer.setAttribute("class", "taskContainer");
        taskContainer.setAttribute("dataKey", key);

        var taskData = document.createElement("div");
        taskData.setAttribute("id", "taskData");

        var title = document.createElement("p");
        title.setAttribute("id", "taskTitle");
        title.setAttribute("contenteditable", "false");
        title.innerHTML = task;

        var date = document.createElement("p");
        date.setAttribute("id", "taskDate");
        date.setAttribute("contenteditable", "false");
        date.innerHTML = taskDate;

        finishedTaskContainer.append(taskContainer);

        taskContainer.append(taskData);
        taskData.append(title);
        taskData.append(date);
      }
    });
}
