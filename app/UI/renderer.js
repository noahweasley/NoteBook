'use strict';

let ACTIVE_TAB = 0;
let NOTE_DATA = [{}, {}, {}];

beginTabInitialization();
checkToolbarItemClick();
awaitCreateNewWindow();

function awaitCreateNewWindow() {
    document.querySelector('.icon-window').addEventListener('click', () => window.bridgeApis.send('new'));
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
} // end check list

function beginTabInitialization() {
    checkSidebarItemClick();
    checkTabItemClick();

    // set up listener
    function setupTabListener(tabItem) {
        tabItem.addEventListener('click', function () {
            ACTIVE_TAB = Array.from(tabItem.parentNode.children).indexOf(tabItem);
            console.log(`active tab ${ACTIVE_TAB}`);
        })
    }

    // start tab item click
    function checkTabItemClick() {
        document.querySelectorAll('.tab-item').forEach(tabItem => setupTabListener(tabItem))
    } // stop tab item click check

    // start sidebar check
    function checkSidebarItemClick() {
        document.querySelectorAll('.list-group-item')
            .forEach(listItem => {
                listItem.addEventListener('click', function () {
                    let newTab = document.createElement('div');
                    let span = document.createElement('span');
                    let tabItemText = document.createElement('p');

                    let oldTab = Array.from(document.querySelector('.tab-group').children)[ACTIVE_TAB];

                    tabItemText.innerText = listItem.lastElementChild.firstElementChild.innerText;
                    tabItemText.classList.add("tab-item-text");
                    newTab.classList.add('tab-item');
                    span.classList.add("icon", "icon-cancel", "icon-close-tab");
                    newTab.appendChild(span);
                    newTab.appendChild(tabItemText);

                    if (appendTabItem(newTab, oldTab)) {
                        setupTabListener(newTab);
                    }

                    displayTextEditor(listItem.lastElementChild.lastElementChild.innerText);

                    // display text editor 
                    function displayTextEditor(initialText) {
                        document.querySelector('.v-container').classList.add("invisible");
                        let editor = document.querySelector('.editor');
                        editor.classList.remove("invisible");
                        editor.value = initialText;
                    }

                    // append tab item 
                    function appendTabItem(newTab, oldTab) {
                        if (getTabGroup().childElementCount > 2) {
                            oldTab.replaceWith(newTab);
                            return false;
                        }

                        getTabGroup().appendChild(newTab);
                        ACTIVE_TAB++;
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
                        return true;
                    }
                })
            })
    }
    // end sidebar check
}