const jsonString = '{"nodeId":2765094705,"root":true,"subs":[{"nodeId":769215230,"subs":[{"nodeId":769197602},{"nodeId":3291201329},{"nodeId":2765234573}]},{"nodeId":769215230,"subs":[{"nodeId":769197602},{"nodeId":3291201329}]}]}';
var Node_jsonObjects = JSON.parse(jsonString);

function countNextLayerObjects(subs) {
  var count = 0;
  if (subs && Array.isArray(subs)) {
    subs.forEach(function(sub) {
      count++;
      if (sub.subs && Array.isArray(sub.subs) && sub.subs.length > 0) {
        count += countNextLayerObjects(sub.subs);
      }
    });
  }
  return count;
}

function createRow(nodeId, subs) {
  var row = document.createElement('tr');

  var nodeIdCell = document.createElement('td');
  nodeIdCell.textContent = nodeId;
  row.appendChild(nodeIdCell);

  var subsCell = document.createElement('td');
  row.appendChild(subsCell);

  var nextLayerCount = countNextLayerObjects(subs);
  if (nextLayerCount > 0) {
    nodeIdCell.textContent += ' (' + nextLayerCount + ')';
  }

  if (subs && Array.isArray(subs) && subs.length > 0) {
    var subTable = document.createElement('table');
    subTable.className = 'sub-table';

    subs.forEach(function(sub) {
      var subRow = createRow(sub.nodeId, sub.subs);
      subTable.appendChild(subRow);
    });

    subsCell.appendChild(subTable);
  }

  return row;
}

function renderTable(jsonObject) {
  var tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  var rootNode = createRow(jsonObject.nodeId, jsonObject.subs);
  tableBody.appendChild(rootNode);
}

renderTable(Node_jsonObjects);