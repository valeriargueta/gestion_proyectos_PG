export enum SecureIpPermissions {
    Console = 'SecureIp.Consola',
    //USERS
    Users = 'SecureIp.Consola:Usuario',
    UpdateUser = 'SecureIp.Consola:Usuario:Actualizar',
    CreateUser = 'SecureIp.Consola:Usuario:Crear',
    ListUser = 'SecureIp.Consola:Usuario:Listar',
    //ROLES
    Roles = 'SecureIp.Consola:Rol',
    UpdateRole = 'SecureIp.Consola:Rol:Actualizar',
    CreateRole = 'SecureIp.Consola:Rol:Crear',
    ListRole = 'SecureIp.Consola:Rol:Listar',
    //MERCHANTS - MERCHANTS
    Merchants = 'SecureIp.Consola:Comercios',
    UpdateMerchat = 'SecureIp.Consola:Comercios:Actualizar',
    ListMerchat = 'SecureIp.Consola:Comercios:Listar',
    //MERCHANTS - QR
    Payments = 'SecureIp.Consola:Pagos',
    ListPayments = 'SecureIp.Consola:Pagos:Listar',
    //MERCHANTS - TRANSACTIONS
    Transactions = 'SecureIp.Consola:Transacciones',
    ListTransactions = 'SecureIp.Consola:Transacciones:Listar',
    CancelTransactions = 'SecureIp.Consola:Transacciones:Anular',
}