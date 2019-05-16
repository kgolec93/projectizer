export const userDataTemplate = {
    username: '',
    email: '',
    tasks: [],
    projects: [
        {
            name: 'Wizualizacje Dobrzykowice',
            leader: 'Kamil Golec',
            dateAdded: '11th May 2019',
            deadline: '30th May 2019',
            status: 'In progress',
            statusCustom: 'First version sent by mail',
            tasks: [
                {
                    name: 'Do the trial first one',
                    date: '4th May 2019',
                    isDone: true
                },
                {
                    name: 'Work on the rest',
                    date: '14th May 2019',
                    isDone: false
                }
            ],
            comments: [
                {
                    author: 'Kamil Golec',
                    date: '14.05.2019',
                    text: 'Initial version sent to the principal and approved, further work is pending'
                },
                {
                    author: 'Kamil Golec',
                    date: '11.05.2019',
                    text: 'Materials recieved'
                },
            ]
        },
    ] 
}

export const taskDataTemplate = {
    name: '',
    status: '',
    date: '',
    isDone: false
}

export const projectDataTemplate = {
    name: '',
    deadline:'',
    status: '',
    statusCustom: '',
    tasks: [],
    comments: []
}

// export { userDataTemplate }
// export { taskDataTemplate }
// export { projectDataTemplate }