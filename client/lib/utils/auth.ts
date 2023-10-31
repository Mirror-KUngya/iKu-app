const searchSenior = (seniorUserID: string, seniorUserPassword: string) => {
  const tempUsers = [
    {
      id: 'abc',
      password: '123',
    },
    {
      id: 'edf',
      password: '123',
    },
  ];

  const target = tempUsers.find(({id, password}) => {
    id === seniorUserID;
  });

  return target ? target.password === seniorUserPassword : false;
};
