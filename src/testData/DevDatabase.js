export const userdata = {
    username: 'kgolec93',
    email: 'kamil.golec@gmail.com',
    password: 'kupa123',
    projects: [
        {
            projectName: 'Wizualizacje Dobrzykowice',
            currentStatus: 'In progress',
            projectData:
                {
                    projectLeader: 'Kamil Golec',
                    principal: 'Archilab Sp. z o.o.',
                    deadline: 1561845600000
                },
            comments: [
                {
                    date: 1557093600000,
                    text: 'Trzeba wysłać wizkę ze zmniejszonym nasyceniem kolorów i czekam dalej na odpowiedź'
                }
            ]
        },
        {
            projectName: 'Wizualizacje Rychtalska poprawki',
            currentStatus: 'To do',
            projectData: 
                {
                    projectLeader: 'Kamil Golec',
                    principal: 'Michał Brzecki',
                    deadline: 1559167200000
                },
            comments: [
                {
                    date: 1557266400000,
                    text: 'Czekam na przesłanie materiałów'
                },
                {
                    date: 1557439200000,
                    text: 'Materiały przesłane, zaczynam robić'
                }
            ]
        },
        {
            projectName: 'Wizualizacje Ełcka',
            currentStatus: 'Done!',
            projectData: 
                {
                    projectLeader: 'Kamil Golec',
                    principal: 'Archilab Sp. z o.o.',
                    deadline: 1559167200000
                },
            comments: [
                {
                    date: 1557266400000,
                    text: 'Czekam na przesłanie materiałów'
                },
                {
                    date: 1557439200000,
                    text: 'Materiały przesłane, zaczynam robić'
                },
                {
                    date: 1559167200000,
                    text: 'Wysłane gotowe wizualizacje'
                }
            ]
        },
    ]
}

export default { userdata }

export const projectData = {
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
  }