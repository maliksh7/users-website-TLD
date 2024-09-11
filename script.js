const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

// fetch the users data
async function fetchUsers() {

    /*
        This a an async function that fetch user data from 'USERS_ENDPOINT', check if the response is ok (status code: 200)
        and then convert response to JSON formatand in the end calls ‘groupUsersByWebsiteTLD‘ function.
    */

    try
    {
        const response = await fetch(USERS_ENDPOINT);
        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response
        const users = await response.json();
        groupUsersByWebsiteTLD(users)
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
    }
}

// group the users by website TLD
function groupUsersByWebsiteTLD(users) {

    /*
        This is a praser function that group the user based on their website Top Level Domein (TLD) and then call
        ‘renderColumn‘ to render column with specific title and website TLD.
    */

    // get users with website TLD .org
    const orgTLD = users.filter((user) => {
        return user.website.includes('.org');
    });

    // get users with website TLD .net
    const netTLD = users.filter((user) => {
        return user.website.includes('.net');
    });

    // get users with website TLD .info
    const infoTLD = users.filter((user) => {
        return user.website.includes('.info');
    });

    // get users with website TLD .biz
    const bizTLD = users.filter((user) => {
        return user.website.includes('.biz');
    });

    // get users with website TLD .io
    const ioTLD = users.filter((user) => {
        return user.website.includes('.io');
    });

    // get users with website TLD .com
    const comTLD = users.filter((user) => {
        return user.website.includes('.com');
    });

    // render respective columns
    renderColumn('.org', orgTLD);
    renderColumn('.net', netTLD);
    renderColumn('.info', infoTLD);
    renderColumn('.biz', bizTLD);
    renderColumn('.io', ioTLD);
    renderColumn('.com', comTLD);
}

// render the user's data
function renderColumn(title, users) {
    /*
        This function renders the column with specific title and users data.
    */
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
    const h3 = document.createElement('h3');
    h3.textContent = title;
    columnDiv.appendChild(h3);
    users.forEach((user) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const nameP = document.createElement('p');
        nameP.textContent = `Name: ${user.name}`;
        cardDiv.appendChild(nameP);
        const usernameP = document.createElement('p');
        usernameP.textContent = `Username: ${user.username}`;
        cardDiv.appendChild(usernameP);
        const websiteP = document.createElement('p');
        websiteP.textContent = `Website: ${user.website}`;
        cardDiv.appendChild(websiteP);
        columnDiv.appendChild(cardDiv);
    });
    const wrapperDiv = document.getElementById('wrapper');
    wrapperDiv.appendChild(columnDiv);
}

// call the fetchUser function
fetchUsers()