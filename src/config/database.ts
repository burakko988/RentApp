const getDatabaseUrl = (): string => {
    let user = '';
    let pass = '';
    let url = '';
    let dbName = '';
    switch (process.env.NODE_ENV) {
        case 'master':
            dbName = process.env['DB_NAME_MASTER'];
            user = process.env['DB_USER_MASTER'];
            pass = process.env['DB_PASSWORD_MASTER'];
            url = process.env['DB_URL_MASTER'];
            return 'mongodb+srv://' + user + ':' + pass + '@' + url + '/' + dbName + '?retryWrites=true&w=majority';

        case 'dev':
            dbName = process.env['DB_NAME_DEV'];
            user = process.env['DB_USER_DEV'];
            pass = process.env['DB_PASSWORD_DEV'];
            url = process.env['DB_URL_DEV'];
            return `mongodb+srv://${user}:${pass}@${url}/${dbName}?retryWrites=true&w=majority`;
    }
};

export { getDatabaseUrl };
