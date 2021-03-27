'use strict';

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    checkSidebarItemClick();
    checkToolbarItemClick();
});

function checkToolbarItemClick() {
    checkListAccess();
    let activeIndices = [];

    function checkListAccess() {
        let toolIcons = document.querySelectorAll('.side-icon');

        toolIcons.forEach(i => {
            i.addEventListener('click', () => {
                // deactivate or activate current only
                let x = Array.from(i.parentNode.children).indexOf(i);
                activeIndices[x] ? i.classList.remove('side-icon-active') : i.classList.add('side-icon-active');
                activeIndices[x] = !activeIndices[x];

                // deactivate all except current
                for (let n = 0; n < toolIcons.length; n++) {
                    if (n !== x) {
                        let toolIcon = toolIcons[n];
                        activeIndices[n] = false;
                        toolIcon.classList.remove('side-icon-active');
                    }
                }
            });
        })

    }
}

// start sidebar check
function checkSidebarItemClick() {
    document.querySelectorAll('.list-group-item')
        .forEach(listItem => {
            listItem.addEventListener('click', function () {
                let tabItem = document.createElement('div');
                let span = document.createElement('span');
                let tabItemText = document.createElement('p');
                tabItemText.innerText = listItem.lastElementChild.firstElementChild.innerText;
                tabItemText.classList.add("tab-item-text");
                tabItem.classList.add('tab-item');
                span.classList.add("icon", "icon-cancel", "icon-close-tab");
                tabItem.appendChild(span);
                tabItem.appendChild(tabItemText);
                appendTabItem(tabItem);

                // append tab item 
                function appendTabItem(element) {
                    getTabGroup().appendChild(element);

                    // Get the tab group element to append the new tab
                    function getTabGroup() {
                        // Existing or non-existing tab container
                        let tabGroup = document.querySelector('.tab-group');
                        return tabGroup ? tabGroup : createTabGroup();

                        // Create new tab group if not exists
                        function createTabGroup() {
                            let pane = document.querySelector('.pane');
                            if (pane) {
                                let tabGroup = document.createElement('div');
                                tabGroup.classList.add('tab-group');
                                pane.appendChild(tabGroup);
                            }
                            return tabGroup; // the now existing tab group to append tab items
                        }
                    }
                }
            })
        })
}
// end sidebar check