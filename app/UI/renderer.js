'use strict';

checkSidebarItemClick();
checkToolbarItemClick();
awaitCreateNewWindow();

function awaitCreateNewWindow() {
    let win = document.querySelector('.icon-window');
    win.addEventListener('click', () => window.bridgeApis.send('new'));
}

function checkToolbarItemClick() {
    checkListAccess();
    let active = true;

    function checkListAccess() {
        let list = document.querySelector('.icon-list');
        let sidebar = document.querySelector('.sidebar');

        list.addEventListener('click', () => {
            // deactivate or activate current only
            if (active) {
                list.classList.add('side-icon-activated');
                sidebar.classList.add('invisible');
            } else {
                list.classList.remove('side-icon-activated');
                sidebar.classList.remove('invisible');
            }
            active = !active;
        });

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
                    if (getTabGroup().childElementCount > 2) return;
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