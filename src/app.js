App = {
    loading: false,
    contracts: {},

    load: async () => {
        // Load Functions
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        }
    },

    loadAccount: async () => {
        // Load account
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0];
    },

    loadContract: async () => {
        // Pull JSON from the build contracts
        const todoList = await $.getJSON('TodoList.json');
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(ethereum);

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed();
        console.log(App.todoList);
    },

    render: async () => {
        // Prevent double render
        if (App.loading) return;

        // Update app loading state
        App.setLoading(true);
        
        // Show Account
        $('#account').html(App.account);

        // Update loading state
        App.setLoading(false);
    },

    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        if (boolean) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})