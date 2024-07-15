function getCards(setCode) {
    axios.get(`http://localhost:3000/api/v1/sets/${setCode}/cards`)
    .then(response => {
        const dataDiv = document.getElementById('api-data');
        let groupDiv = null;
        const emptyDiv = document.createElement('div');
        dataDiv.appendChild(emptyDiv);

        Object.values(response.data.cards).forEach((item, index) => {
            // Create elements
            const itemDiv = document.createElement('div');
            const cardContainer = document.createElement('div');
            const img = document.createElement('img');
            const detailsDiv = document.createElement('div'); // new div for details
            const code = document.createElement('h3');
            const title = document.createElement('h5');

            // Set properties of elements
            itemDiv.classList.add('card');
            if (item.type == 'LEADER') { // replace 'isLeader' with the actual property
                itemDiv.classList.add('leader');
            }
            cardContainer.classList.add('card-container');
            img.classList.add('card-img');
            img.src = item.image_src;
            detailsDiv.classList.add('card-details'); // new class for details div
            code.classList.add('card-code');
            code.textContent = item.code;
            title.classList.add('card-title');
            if (/_p(\d+)/.test(item.id)) {
                const match = item.id.match(/_p(\d+)/);
                const number = match ? match[1] : '';
                title.textContent = `${item.name} ★${number}`;
            } else {
                title.textContent = item.name;
            }

            // Append elements to their parents
            if (index % 4 === 0) {
                groupDiv = document.createElement('div');
                groupDiv.classList.add('card-group');
                dataDiv.appendChild(groupDiv);
            }
            itemDiv.appendChild(cardContainer);
            cardContainer.appendChild(img);
            cardContainer.appendChild(detailsDiv); // append details div to card
            detailsDiv.appendChild(code); // append code to details div
            detailsDiv.appendChild(title); // append title to details div
            groupDiv.appendChild(itemDiv);
        });
    })
    .catch(error => console.error('Error:', error));
}