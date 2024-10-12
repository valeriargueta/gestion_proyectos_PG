/* Options:
Date: 2024-10-09 09:05:11
Version: 8.22
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://backend.console-project-managment.com

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId?: string;
}

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IPost
{
}

export interface IGet
{
}

export class UserModel
{
    public id: number;
    public firstName: string;
    public lastName: string;
    public displayName: string;
    public email: string;
    public timeZone: string;
    public language: string;
    public status: boolean;
    public roles: string[];
    public permissions: string[];

    public constructor(init?: Partial<UserModel>) { (Object as any).assign(this, init); }
}

export class PermissionModel
{
    public id: number;
    public name: string;
    public parent?: number;

    public constructor(init?: Partial<PermissionModel>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class TimeZoneModel
{
    public id: string;
    public value: string;

    public constructor(init?: Partial<TimeZoneModel>) { (Object as any).assign(this, init); }
}

export class LanguageModel
{
    public id: string;
    public value: string;

    public constructor(init?: Partial<LanguageModel>) { (Object as any).assign(this, init); }
}

export class CategoryDataModel
{
    public id: number;
    public name: string;

    public constructor(init?: Partial<CategoryDataModel>) { (Object as any).assign(this, init); }
}

export class ChannelDataModel
{
    public id: number;
    public name: string;
    public type: string;
    public defaultPaymentProcessor: string;
    public statusCode: string;
    public imageUrl: string;
    public createAt: string;
    public updateAt?: string;

    public constructor(init?: Partial<ChannelDataModel>) { (Object as any).assign(this, init); }
}

export class MerchantDataModel
{
    public id: string;
    public externalId: string;
    public channelId: number;
    public name: string;
    public address: string;
    public city: string;
    public stateOrProvince: string;
    public status: boolean;
    public postalCode: string;
    public statusCode: string;
    public logo: string;
    public categoryId: number;
    public extraInformation: string;
    public linked: boolean;

    public constructor(init?: Partial<MerchantDataModel>) { (Object as any).assign(this, init); }
}

export class TransactionDataModel
{
    public id: string;
    public paymentTransactionId: string;
    public merchantId: string;
    public paymentId: string;
    public cardType: string;
    public cardLastFour: string;
    public authCode: string;
    public avsResponseCode: string;
    public ccvResponseCode: string;
    public cavvResponseCode: string;
    public cardIssuerReference: string;
    public responseCode: string;
    public responseMessage: string;
    public amount: string;
    public createdDate?: string;
    public processor: string;
    public status: string;

    public constructor(init?: Partial<TransactionDataModel>) { (Object as any).assign(this, init); }
}

export class PaymentDataModel
{
    public paymentId: string;
    public merchantId: string;
    public amount: number;
    public type: string;
    public statusCode: string;
    public description: string;
    public activeTime: number;
    public externalReference: string;
    public createdDate?: string;
    public updatedDate?: string;

    public constructor(init?: Partial<PaymentDataModel>) { (Object as any).assign(this, init); }
}

export class QrCodesModel
{
    public paymentId: string;
    public externalReference: string;
    public description: string;
    public downloadLink: string;
    public createdAt: string;

    public constructor(init?: Partial<QrCodesModel>) { (Object as any).assign(this, init); }
}

export class CompanyModel
{
    public id: number;
    public name: string;
    public email: string;
    public logo: string;
    public enabled: boolean;
    public tokenIdCompanyId: number;

    public constructor(init?: Partial<CompanyModel>) { (Object as any).assign(this, init); }
}

export class RoleModel
{
    public id: number;
    public name: string;
    public users: number;
    public status: boolean;

    public constructor(init?: Partial<RoleModel>) { (Object as any).assign(this, init); }
}

export interface IAuthTokens
{
    provider: string;
    userId: string;
    accessToken: string;
    accessTokenSecret: string;
    refreshToken: string;
    refreshTokenExpiry?: string;
    requestToken: string;
    requestTokenSecret: string;
    items: { [index: string]: string; };
}

// @DataContract
export class AuthUserSession
{
    // @DataMember(Order=1)
    public referrerUrl: string;

    // @DataMember(Order=2)
    public id: string;

    // @DataMember(Order=3)
    public userAuthId: string;

    // @DataMember(Order=4)
    public userAuthName: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public twitterUserId: string;

    // @DataMember(Order=7)
    public twitterScreenName: string;

    // @DataMember(Order=8)
    public facebookUserId: string;

    // @DataMember(Order=9)
    public facebookUserName: string;

    // @DataMember(Order=10)
    public firstName: string;

    // @DataMember(Order=11)
    public lastName: string;

    // @DataMember(Order=12)
    public displayName: string;

    // @DataMember(Order=13)
    public company: string;

    // @DataMember(Order=14)
    public email: string;

    // @DataMember(Order=15)
    public primaryEmail: string;

    // @DataMember(Order=16)
    public phoneNumber: string;

    // @DataMember(Order=17)
    public birthDate?: string;

    // @DataMember(Order=18)
    public birthDateRaw: string;

    // @DataMember(Order=19)
    public address: string;

    // @DataMember(Order=20)
    public address2: string;

    // @DataMember(Order=21)
    public city: string;

    // @DataMember(Order=22)
    public state: string;

    // @DataMember(Order=23)
    public country: string;

    // @DataMember(Order=24)
    public culture: string;

    // @DataMember(Order=25)
    public fullName: string;

    // @DataMember(Order=26)
    public gender: string;

    // @DataMember(Order=27)
    public language: string;

    // @DataMember(Order=28)
    public mailAddress: string;

    // @DataMember(Order=29)
    public nickname: string;

    // @DataMember(Order=30)
    public postalCode: string;

    // @DataMember(Order=31)
    public timeZone: string;

    // @DataMember(Order=32)
    public requestTokenSecret: string;

    // @DataMember(Order=33)
    public createdAt: string;

    // @DataMember(Order=34)
    public lastModified: string;

    // @DataMember(Order=35)
    public roles: string[];

    // @DataMember(Order=37)
    public isAuthenticated: boolean;

    // @DataMember(Order=38)
    public fromToken: boolean;

    // @DataMember(Order=39)
    public profileUrl: string;

    // @DataMember(Order=40)
    public sequence: string;

    // @DataMember(Order=41)
    public tag: number;

    // @DataMember(Order=42)
    public authProvider: string;

    // @DataMember(Order=43)
    public providerOAuthAccess: IAuthTokens[];

    // @DataMember(Order=44)
    public meta: { [index: string]: string; };

    // @DataMember(Order=45)
    public audiences: string[];

    // @DataMember(Order=46)
    public scopes: string[];

    // @DataMember(Order=47)
    public dns: string;

    // @DataMember(Order=48)
    public rsa: string;

    // @DataMember(Order=49)
    public sid: string;

    // @DataMember(Order=50)
    public hash: string;

    // @DataMember(Order=51)
    public homePhone: string;

    // @DataMember(Order=52)
    public mobilePhone: string;

    // @DataMember(Order=53)
    public webpage: string;

    // @DataMember(Order=54)
    public emailConfirmed?: boolean;

    // @DataMember(Order=55)
    public phoneNumberConfirmed?: boolean;

    // @DataMember(Order=56)
    public twoFactorEnabled?: boolean;

    // @DataMember(Order=57)
    public securityStamp: string;

    // @DataMember(Order=58)
    public type: string;

    // @DataMember(Order=59)
    public recoveryToken: string;

    // @DataMember(Order=60)
    public refId?: number;

    // @DataMember(Order=61)
    public refIdStr: string;

    // @DataMember(Order=36)
    public permissions: string[];

    public constructor(init?: Partial<AuthUserSession>) { (Object as any).assign(this, init); }
}

export class RoleDataModel
{
    public id: number;
    public name: string;
    public enabled: boolean;
    public companyId: number;

    public constructor(init?: Partial<RoleDataModel>) { (Object as any).assign(this, init); }
}

export class NameCompanyModel
{
    public id: number;
    public name: string;

    public constructor(init?: Partial<NameCompanyModel>) { (Object as any).assign(this, init); }
}

// @DataContract
export class UserApiKey
{
    // @DataMember(Order=1)
    public key: string;

    // @DataMember(Order=2)
    public keyType: string;

    // @DataMember(Order=3)
    public expiryDate?: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<UserApiKey>) { (Object as any).assign(this, init); }
}

export class GetPermissionsResponse
{
    public permissions: PermissionModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetPermissionsResponse>) { (Object as any).assign(this, init); }
}

export class GetPermissionResponse
{
    public permission: PermissionModel;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetPermissionResponse>) { (Object as any).assign(this, init); }
}

export class GetTimeZonesResponse
{
    public timeZones: TimeZoneModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetTimeZonesResponse>) { (Object as any).assign(this, init); }
}

export class GetLanguagesResponse
{
    public languages: LanguageModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetLanguagesResponse>) { (Object as any).assign(this, init); }
}

export class GetCategoriesResponse
{
    public responseStatus: ResponseStatus;
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;
    public categories: CategoryDataModel[];

    public constructor(init?: Partial<GetCategoriesResponse>) { (Object as any).assign(this, init); }
}

export class GetAllChannelsResponse
{
    public responseStatus: ResponseStatus;
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;
    public channels: ChannelDataModel[];

    public constructor(init?: Partial<GetAllChannelsResponse>) { (Object as any).assign(this, init); }
}

export class GetCountsDashboardResponse
{
    public countChannelsTotal: number;
    public countChannelsBy: number;
    public countMerchants: number;
    public countTransactions: number;
    public countTransactionsWeek: number[];
    public countSuccessTransactionsWeek: number[];
    public countTransactionsTotalWeek: number;
    public countSuccessTransactions: number;
    public countActiveTransactions: number;
    public countOverdueTransactions: number;
    public countFailedTransactions: number;
    public averageMonthlyGrowth: number;
    public totalDailySalesCurrentMonth: number[];
    public totalDailySalesPreviousMonth: number[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetCountsDashboardResponse>) { (Object as any).assign(this, init); }
}

export class GetCountChannelsByResponse
{
    public countChannelsBy: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetCountChannelsByResponse>) { (Object as any).assign(this, init); }
}

export class GetSalesMonthlyIncomeResponse
{
    public salesIncomeOfMonth: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetSalesMonthlyIncomeResponse>) { (Object as any).assign(this, init); }
}

export class GetAllMerchantsResponse
{
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;
    public merchants: MerchantDataModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetAllMerchantsResponse>) { (Object as any).assign(this, init); }
}

export class GetMerchantResponse
{
    public merchant: MerchantDataModel;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetMerchantResponse>) { (Object as any).assign(this, init); }
}

export class UpdateMerchantStatusResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateMerchantStatusResponse>) { (Object as any).assign(this, init); }
}

export class UpdateMerchantResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateMerchantResponse>) { (Object as any).assign(this, init); }
}

export class GetAllTransactionsResponse
{
    public responseStatus: ResponseStatus;
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;
    public transactions: TransactionDataModel[];

    public constructor(init?: Partial<GetAllTransactionsResponse>) { (Object as any).assign(this, init); }
}

export class GetQrPaymentsStaticsResponse
{
    public payments: PaymentDataModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetQrPaymentsStaticsResponse>) { (Object as any).assign(this, init); }
}

export class GetQrCodesByMerchantResponse
{
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;
    public qrCodes: QrCodesModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetQrCodesByMerchantResponse>) { (Object as any).assign(this, init); }
}

export class GetTransactionsByMerchantResponse
{
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;
    public transactions: TransactionDataModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetTransactionsByMerchantResponse>) { (Object as any).assign(this, init); }
}

export class GetCsvTransactionsByMerchantResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetCsvTransactionsByMerchantResponse>) { (Object as any).assign(this, init); }
}

export class CreateVoidTransactionResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateVoidTransactionResponse>) { (Object as any).assign(this, init); }
}

export class GetPdfQrCodeResponse
{

    public constructor(init?: Partial<GetPdfQrCodeResponse>) { (Object as any).assign(this, init); }
}

export class GetFilterDatesResponse
{
    public responseStatus: ResponseStatus;
    public availableGap: number;
    public startDate: string;
    public endDate: string;

    public constructor(init?: Partial<GetFilterDatesResponse>) { (Object as any).assign(this, init); }
}

export class SetFilterDayResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<SetFilterDayResponse>) { (Object as any).assign(this, init); }
}

export class DownloadTransactionReportResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DownloadTransactionReportResponse>) { (Object as any).assign(this, init); }
}

export class GetUserDataResponse
{
    public user: UserModel;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetUserDataResponse>) { (Object as any).assign(this, init); }
}

export class GetUsersDataResponse
{
    public responseStatus: ResponseStatus;
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;
    public users: UserModel[];

    public constructor(init?: Partial<GetUsersDataResponse>) { (Object as any).assign(this, init); }
}

export class CreateUserDataResponse
{
    public id: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateUserDataResponse>) { (Object as any).assign(this, init); }
}

export class UpdateUserDataResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateUserDataResponse>) { (Object as any).assign(this, init); }
}

export class DeleteUserDataResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DeleteUserDataResponse>) { (Object as any).assign(this, init); }
}

export class GetSessionPermissionsResponse
{
    public permissions: string[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetSessionPermissionsResponse>) { (Object as any).assign(this, init); }
}

export class GetSessionCompanyDataResponse
{
    public company: CompanyModel;

    public constructor(init?: Partial<GetSessionCompanyDataResponse>) { (Object as any).assign(this, init); }
}

export class ToggleUserStatusResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ToggleUserStatusResponse>) { (Object as any).assign(this, init); }
}

export class GetUserRolesResponse
{
    public roles: RoleModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetUserRolesResponse>) { (Object as any).assign(this, init); }
}

export class AssignRoleResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AssignRoleResponse>) { (Object as any).assign(this, init); }
}

export class UnAssignRoleResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UnAssignRoleResponse>) { (Object as any).assign(this, init); }
}

export class UpdateUserPasswordResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateUserPasswordResponse>) { (Object as any).assign(this, init); }
}

export class GetAccountResponse
{
    public user: UserModel;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetAccountResponse>) { (Object as any).assign(this, init); }
}

export class UpdateAccountResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateAccountResponse>) { (Object as any).assign(this, init); }
}

export class CreateUserLoginHistoryResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateUserLoginHistoryResponse>) { (Object as any).assign(this, init); }
}

export class GetSessionResponse
{
    public result: AuthUserSession;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetSessionResponse>) { (Object as any).assign(this, init); }
}

export class GetRoleDataResponse
{
    public role: RoleDataModel;
    public permissions: PermissionModel[];
    public grantedPermissions: number[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetRoleDataResponse>) { (Object as any).assign(this, init); }
}

export class GetRolesDataResponse
{
    public roles: RoleModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetRolesDataResponse>) { (Object as any).assign(this, init); }
}

export class CreateRoleDataResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateRoleDataResponse>) { (Object as any).assign(this, init); }
}

export class UpdateRoleDataResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateRoleDataResponse>) { (Object as any).assign(this, init); }
}

export class UpdateRoleStatusResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateRoleStatusResponse>) { (Object as any).assign(this, init); }
}

export class DeleteRoleDataResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DeleteRoleDataResponse>) { (Object as any).assign(this, init); }
}

export class AssignPermissionsResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AssignPermissionsResponse>) { (Object as any).assign(this, init); }
}

export class CreateCompanyResponse
{
    public companyId: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateCompanyResponse>) { (Object as any).assign(this, init); }
}

export class GetCompaniesResponse
{
    public companies: CompanyModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetCompaniesResponse>) { (Object as any).assign(this, init); }
}

export class GetCompaniesNameResponse
{
    public companies: NameCompanyModel[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetCompaniesNameResponse>) { (Object as any).assign(this, init); }
}

export class GetCompanyResponse
{
    public company: CompanyModel;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetCompanyResponse>) { (Object as any).assign(this, init); }
}

export class UpdateCompanyResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateCompanyResponse>) { (Object as any).assign(this, init); }
}

export class DeleteCompanyResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<DeleteCompanyResponse>) { (Object as any).assign(this, init); }
}

export class PreAuthenticateResponse
{
    public responseStatus: ResponseStatus;
    public tokenSeed: string;

    public constructor(init?: Partial<PreAuthenticateResponse>) { (Object as any).assign(this, init); }
}

export class ForgotPasswordResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ForgotPasswordResponse>) { (Object as any).assign(this, init); }
}

export class ValidateRestorePasswordTokenResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ValidateRestorePasswordTokenResponse>) { (Object as any).assign(this, init); }
}

export class RestoreUserPasswordResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<RestoreUserPasswordResponse>) { (Object as any).assign(this, init); }
}

export class ValidateActivateUserTokenResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ValidateActivateUserTokenResponse>) { (Object as any).assign(this, init); }
}

export class ActivateUserResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ActivateUserResponse>) { (Object as any).assign(this, init); }
}

export class SendQueueTransactionListResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<SendQueueTransactionListResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public refreshTokenExpiry?: string;

    // @DataMember(Order=9)
    public profileUrl: string;

    // @DataMember(Order=10)
    public roles: string[];

    // @DataMember(Order=11)
    public permissions: string[];

    // @DataMember(Order=12)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=13)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class GetApiKeysResponse
{
    // @DataMember(Order=1)
    public results: UserApiKey[];

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetApiKeysResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class RegenerateApiKeysResponse
{
    // @DataMember(Order=1)
    public results: UserApiKey[];

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<RegenerateApiKeysResponse>) { (Object as any).assign(this, init); }
}

/** @description Get the permission list. */
// @Route("/authorization/permissions", "GET")
// @Route("/authorization/permissions/parent/{ParentId}", "GET")
// @Api(Description="Get the permission list.")
export class GetPermissions implements IReturn<GetPermissionsResponse>
{
    public parentId: number;

    public constructor(init?: Partial<GetPermissions>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetPermissions'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetPermissionsResponse(); }
}

/** @description Get permission by Id. */
// @Route("/authorization/permissions/{Id}", "GET")
// @Api(Description="Get permission by Id.")
export class GetPermission implements IReturn<GetPermissionResponse>
{
    public id: number;

    public constructor(init?: Partial<GetPermission>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetPermission'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetPermissionResponse(); }
}

/** @description Time zone information. */
// @Route("/timezones", "GET")
// @Api(Description="Time zone information.")
export class GetTimeZones implements IReturn<GetTimeZonesResponse>
{

    public constructor(init?: Partial<GetTimeZones>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTimeZones'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTimeZonesResponse(); }
}

/** @description Languages information. */
// @Route("/langugages", "GET")
// @Api(Description="Languages information.")
export class GetLanguages implements IReturn<GetLanguagesResponse>
{

    public constructor(init?: Partial<GetLanguages>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetLanguages'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetLanguagesResponse(); }
}

/** @description Obtener listado de categorias. */
// @Route("/category/list", "GET")
// @Api(Description="Obtener listado de categorias.")
export class GetCategories implements IReturn<GetCategoriesResponse>
{
    public page: number;
    public itemsPerPage: number;

    public constructor(init?: Partial<GetCategories>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCategories'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCategoriesResponse(); }
}

/** @description Obtener listado de canales. */
// @Route("/channel/list", "GET")
// @Api(Description="Obtener listado de canales.")
export class GetAllChannels implements IReturn<GetAllChannelsResponse>
{
    public page: number;
    public itemsPerPage: number;

    public constructor(init?: Partial<GetAllChannels>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllChannels'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAllChannelsResponse(); }
}

// @Route("/dashboard", "GET")
export class GetCountsDashboard implements IReturn<GetCountsDashboardResponse>
{

    public constructor(init?: Partial<GetCountsDashboard>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCountsDashboard'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCountsDashboardResponse(); }
}

// @Route("/channel/count", "GET")
export class GetCountChannelsBy implements IReturn<GetCountChannelsByResponse>
{
    public channelTimeType: number;

    public constructor(init?: Partial<GetCountChannelsBy>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCountChannelsBy'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCountChannelsByResponse(); }
}

// @Route("/transactions/salesMonthly", "GET")
export class GetSalesMonthlyIncome implements IReturn<GetSalesMonthlyIncomeResponse>
{
    public salesTimeType: number;

    public constructor(init?: Partial<GetSalesMonthlyIncome>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSalesMonthlyIncome'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSalesMonthlyIncomeResponse(); }
}

// @Route("/merchant/list", "GET")
export class GetAllMerchants implements IReturn<GetAllMerchantsResponse>
{
    public page: number;
    public itemsPerPage: number;

    public constructor(init?: Partial<GetAllMerchants>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllMerchants'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAllMerchantsResponse(); }
}

export class GetMerchant implements IReturn<GetMerchantResponse>
{
    public merchantId: string;

    public constructor(init?: Partial<GetMerchant>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetMerchant'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetMerchantResponse(); }
}

/** @description Actualizar estado de comercio. */
// @Route("/merchant/updateStatus", "PUT")
// @Api(Description="Actualizar estado de comercio.")
export class UpdateMerchantStatus implements IReturn<UpdateMerchantStatusResponse>
{
    public merchantId: string;
    public merchantStatus: boolean;

    public constructor(init?: Partial<UpdateMerchantStatus>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateMerchantStatus'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateMerchantStatusResponse(); }
}

/** @description Actualizar comercio. */
// @Route("/merchant/update", "PUT")
// @Api(Description="Actualizar comercio.")
export class UpdateMerchant implements IReturn<UpdateMerchantResponse>
{
    public id: string;
    public address: string;
    public city: string;
    public state: string;
    public postalCode: string;

    public constructor(init?: Partial<UpdateMerchant>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateMerchant'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateMerchantResponse(); }
}

/** @description Obtener listado de transacciones. */
// @Route("/transaction/list", "GET")
// @Api(Description="Obtener listado de transacciones.")
export class GetAllTransactions implements IReturn<GetAllTransactionsResponse>
{
    public page: number;
    public itemsPerPage: number;

    public constructor(init?: Partial<GetAllTransactions>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllTransactions'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAllTransactionsResponse(); }
}

// @Route("/payments/static/list", "GET")
export class GetQrPaymentsStatics implements IReturn<GetQrPaymentsStaticsResponse>
{

    public constructor(init?: Partial<GetQrPaymentsStatics>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetQrPaymentsStatics'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetQrPaymentsStaticsResponse(); }
}

// @Route("/qrsByMerchant/list", "GET")
export class GetQrCodesStaticsByMerchant implements IReturn<GetQrCodesByMerchantResponse>
{
    public merchantId: string;
    public descriptionFilter: string;
    public page: number;
    public itemsPerPage: number;

    public constructor(init?: Partial<GetQrCodesStaticsByMerchant>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetQrCodesStaticsByMerchant'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetQrCodesByMerchantResponse(); }
}

// @Route("/transactionByMerchant/list", "GET")
export class GetTransactionsByMerchant implements IReturn<GetTransactionsByMerchantResponse>
{
    public merchantId: string;
    public page: number;
    public itemsPerPage: number;
    public startDate: string;
    public endDate: string;

    public constructor(init?: Partial<GetTransactionsByMerchant>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTransactionsByMerchant'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTransactionsByMerchantResponse(); }
}

// @Route("/transactionByMerchant/csv", "GET")
export class GetCsvTransactionsByMerchant implements IReturn<GetCsvTransactionsByMerchantResponse>
{
    public merchantId: string;
    public startDate: string;
    public endDate: string;

    public constructor(init?: Partial<GetCsvTransactionsByMerchant>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCsvTransactionsByMerchant'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCsvTransactionsByMerchantResponse(); }
}

/** @description Anular transacción */
// @Route("/cards/void", "POST")
// @Api(Description="Anular transacción")
export class CreateVoidTransaction implements IReturn<CreateVoidTransactionResponse>
{
    public transactionId: string;

    public constructor(init?: Partial<CreateVoidTransaction>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateVoidTransaction'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateVoidTransactionResponse(); }
}

// @Route("/qrCodeById/pdf", "GET")
export class GetPdfQrCode implements IReturn<GetPdfQrCodeResponse>
{
    public id: string;

    public constructor(init?: Partial<GetPdfQrCode>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetPdfQrCode'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetPdfQrCodeResponse(); }
}

export class GetFilterDates implements IReturn<GetFilterDatesResponse>
{

    public constructor(init?: Partial<GetFilterDates>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFilterDates'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetFilterDatesResponse(); }
}

export class SetFilterDay implements IReturn<SetFilterDayResponse>
{
    public days: number;

    public constructor(init?: Partial<SetFilterDay>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SetFilterDay'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new SetFilterDayResponse(); }
}

/** @description Anular transacción */
// @Route("/reports/{reportId}", "GET")
// @Api(Description="Anular transacción")
export class DownloadTransactionReport implements IReturn<DownloadTransactionReportResponse>
{
    public reportId: number;

    public constructor(init?: Partial<DownloadTransactionReport>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DownloadTransactionReport'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new DownloadTransactionReportResponse(); }
}

/** @description Se obtiene el usuario Backend por su ID */
// @Api(Description="Se obtiene el usuario Backend por su ID")
export class GetUserData implements IReturn<GetUserDataResponse>
{
    public id: number;

    public constructor(init?: Partial<GetUserData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserData'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetUserDataResponse(); }
}

/** @description Obtener la lista de usuarios de backend. */
// @Route("/user/list", "GET")
// @Api(Description="Obtener la lista de usuarios de backend.")
export class GetUsersData implements IReturn<GetUsersDataResponse>
{
    public page: number;
    public itemsPerPage: number;
    public displayNameFilter: string;

    public constructor(init?: Partial<GetUsersData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUsersData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUsersDataResponse(); }
}

/** @description Crear un nuevo usuario Backend */
// @Route("/user/createUserData", "POST")
// @Api(Description="Crear un nuevo usuario Backend")
export class CreateUserData implements IReturn<CreateUserDataResponse>
{
    public companyId: number;
    public email: string;
    public firstName: string;
    public lastName: string;
    public timeZone: string;
    public language: string;
    public roles: number[];

    public constructor(init?: Partial<CreateUserData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateUserData'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateUserDataResponse(); }
}

/** @description Actualiza la información de un usuario backend */
// @Route("/user/edit", "PUT")
// @Api(Description="Actualiza la información de un usuario backend")
export class UpdateUserData implements IReturn<UpdateUserDataResponse>
{
    public id: number;
    public firstName: string;
    public lastName: string;
    public timeZone: string;
    public language: string;
    public roles: number[];

    public constructor(init?: Partial<UpdateUserData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUserData'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateUserDataResponse(); }
}

/** @description Eliminar un usuario backend. */
// @Api(Description="Eliminar un usuario backend.")
export class DeleteUserData implements IReturn<DeleteUserDataResponse>
{
    public id: number;

    public constructor(init?: Partial<DeleteUserData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteUserData'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteUserDataResponse(); }
}

/** @description Obtener permisos por el Id de usuario */
// @Api(Description="Obtener permisos por el Id de usuario")
export class GetSessionPermissions implements IReturn<GetSessionPermissionsResponse>
{

    public constructor(init?: Partial<GetSessionPermissions>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSessionPermissions'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSessionPermissionsResponse(); }
}

/** @description Obtener compañía del usuario actual. */
// @Api(Description="Obtener compañía del usuario actual.")
export class GetSessionCompanyData implements IReturn<GetSessionCompanyDataResponse>
{

    public constructor(init?: Partial<GetSessionCompanyData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSessionCompanyData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSessionCompanyDataResponse(); }
}

export class ToggleUserStatus implements IReturn<ToggleUserStatusResponse>
{
    public id: number;

    public constructor(init?: Partial<ToggleUserStatus>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ToggleUserStatus'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ToggleUserStatusResponse(); }
}

/** @description Obener lista de roles por usuario. */
// @Api(Description="Obener lista de roles por usuario.")
export class GetUserRoles implements IReturn<GetUserRolesResponse>
{
    public userId?: number;

    public constructor(init?: Partial<GetUserRoles>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserRoles'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserRolesResponse(); }
}

/** @description Asignar Rol. */
// @Api(Description="Asignar Rol.")
export class AssignRole implements IReturn<AssignRoleResponse>
{
    public userId: number;
    public roleId: number;

    public constructor(init?: Partial<AssignRole>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AssignRole'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AssignRoleResponse(); }
}

/** @description Anular Asignación de Rol  . */
// @Api(Description="Anular Asignación de Rol  .")
export class UnAssignRole implements IReturn<UnAssignRoleResponse>
{
    public userId: number;
    public roleId: number;

    public constructor(init?: Partial<UnAssignRole>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UnAssignRole'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new UnAssignRoleResponse(); }
}

/** @description Actualizar contraseña de usuario. */
// @Api(Description="Actualizar contraseña de usuario.")
export class UpdateUserPassword implements IReturn<UpdateUserPasswordResponse>
{
    public userId: number;
    public newPassword: string;

    public constructor(init?: Partial<UpdateUserPassword>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUserPassword'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateUserPasswordResponse(); }
}

/** @description Obtener Cuenta. */
// @Api(Description="Obtener Cuenta.")
export class GetAccount implements IReturn<GetAccountResponse>
{

    public constructor(init?: Partial<GetAccount>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAccount'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAccountResponse(); }
}

/** @description Actualizar Cuenta */
// @Api(Description="Actualizar Cuenta")
export class UpdateAccount implements IReturn<UpdateAccountResponse>
{
    public user: UserModel;

    public constructor(init?: Partial<UpdateAccount>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateAccount'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateAccountResponse(); }
}

export class CreateUserLoginHistory implements IReturn<CreateUserLoginHistoryResponse>
{
    public userEmail: string;
    public userAgent: string;
    public userIP: string;
    public status: string;

    public constructor(init?: Partial<CreateUserLoginHistory>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateUserLoginHistory'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateUserLoginHistoryResponse(); }
}

/** @description Obtener sesión actual de usuario. */
// @Api(Description="Obtener sesión actual de usuario.")
export class GetSession implements IReturn<GetSessionResponse>
{

    public constructor(init?: Partial<GetSession>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSession'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSessionResponse(); }
}

/** @description Obtener el Rol por su ID. */
// @Route("/token/RolData", "GET")
// @Api(Description="Obtener el Rol por su ID.")
export class GetRoleData implements IReturn<GetRoleDataResponse>
{
    public id: number;

    public constructor(init?: Partial<GetRoleData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetRoleData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetRoleDataResponse(); }
}

/** @description Obtener la lista de roles */
// @Route("/rol/list", "GET")
// @Api(Description="Obtener la lista de roles")
export class GetRolesData implements IReturn<GetRolesDataResponse>
{

    public constructor(init?: Partial<GetRolesData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetRolesData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetRolesDataResponse(); }
}

/** @description Crear un nuevo Rol asignando sus respectivos permisos. */
// @Route("/rol/add", "POST")
// @Api(Description="Crear un nuevo Rol asignando sus respectivos permisos.")
export class CreateRoleData implements IReturn<CreateRoleDataResponse>
{
    // @ApiMember(IsRequired=true, ParameterType="body")
    public name: string;

    // @ApiMember(IsRequired=true, ParameterType="body")
    public permissions: number[];

    public constructor(init?: Partial<CreateRoleData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateRoleData'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateRoleDataResponse(); }
}

/** @description Delete role. */
// @Api(Description="Delete role.")
export class UpdateRoleData implements IReturn<UpdateRoleDataResponse>
{
    public id: number;
    public name: string;
    public permissions: number[];

    public constructor(init?: Partial<UpdateRoleData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateRoleData'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateRoleDataResponse(); }
}

/** @description Actualizar estado de rol */
// @Route("/rol/updateStatus", "PUT")
// @Api(Description="Actualizar estado de rol")
export class UpdateRoleStatus implements IReturn<UpdateRoleStatusResponse>
{
    public id: number;
    public status: boolean;

    public constructor(init?: Partial<UpdateRoleStatus>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateRoleStatus'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateRoleStatusResponse(); }
}

export class DeleteRoleData implements IReturn<DeleteRoleDataResponse>
{
    public id: number;

    public constructor(init?: Partial<DeleteRoleData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteRoleData'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteRoleDataResponse(); }
}

/** @description Asignación de permisos. */
// @Route("/rol/assignPermissions", "POST")
// @Api(Description="Asignación de permisos.")
export class AssignPermissions implements IReturn<AssignPermissionsResponse>
{
    public roleId: number;
    public permissions: number[];

    public constructor(init?: Partial<AssignPermissions>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AssignPermissions'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AssignPermissionsResponse(); }
}

export class CreateCompany implements IReturn<CreateCompanyResponse>
{
    public name: string;
    public email: string;
    public logo: string;
    public enabled: boolean;

    public constructor(init?: Partial<CreateCompany>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateCompany'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateCompanyResponse(); }
}

export class GetCompanies implements IReturn<GetCompaniesResponse>
{

    public constructor(init?: Partial<GetCompanies>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanies'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetCompaniesResponse(); }
}

export class GetCompaniesName implements IReturn<GetCompaniesNameResponse>
{

    public constructor(init?: Partial<GetCompaniesName>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompaniesName'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetCompaniesNameResponse(); }
}

export class GetCompany implements IReturn<GetCompanyResponse>
{
    public companyId: number;

    public constructor(init?: Partial<GetCompany>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompany'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetCompanyResponse(); }
}

export class UpdateCompany implements IReturn<UpdateCompanyResponse>
{
    public companyId: number;
    public name: string;
    public logo: string;
    public email: string;
    public enabled: boolean;

    public constructor(init?: Partial<UpdateCompany>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateCompany'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateCompanyResponse(); }
}

export class DeleteCompany implements IReturn<DeleteCompanyResponse>
{
    public companyId: number;

    public constructor(init?: Partial<DeleteCompany>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteCompany'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new DeleteCompanyResponse(); }
}

/** @description Get the permission list. */
// @Route("/preauthenticate", "POST")
// @Api(Description="Get the permission list.")
export class PreAuthenticate implements IReturn<PreAuthenticateResponse>
{
    public userName: string;
    public password: string;
    public rememberMe?: boolean;

    public constructor(init?: Partial<PreAuthenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PreAuthenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new PreAuthenticateResponse(); }
}

/** @description Reset user password. */
// @Route("/authorization/users/forgot-password", "POST")
// @Api(Description="Reset user password.")
export class ForgotPassword implements IReturn<ForgotPasswordResponse>
{
    // @ApiMember(IsRequired=true, ParameterType="body")
    public email: string;

    public constructor(init?: Partial<ForgotPassword>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ForgotPassword'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ForgotPasswordResponse(); }
}

export class ValidateRestorePasswordToken implements IReturn<ValidateRestorePasswordTokenResponse>
{
    public token: string;

    public constructor(init?: Partial<ValidateRestorePasswordToken>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ValidateRestorePasswordToken'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ValidateRestorePasswordTokenResponse(); }
}

export class RestoreUserPassword implements IReturn<RestoreUserPasswordResponse>
{
    public token: string;
    public newPassword: string;

    public constructor(init?: Partial<RestoreUserPassword>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RestoreUserPassword'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new RestoreUserPasswordResponse(); }
}

export class ValidateActivateUserToken implements IReturn<ValidateActivateUserTokenResponse>
{
    public token: string;

    public constructor(init?: Partial<ValidateActivateUserToken>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ValidateActivateUserToken'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ValidateActivateUserTokenResponse(); }
}

export class ActivateUser implements IReturn<ActivateUserResponse>
{
    public token: string;
    public newPassword: string;

    public constructor(init?: Partial<ActivateUser>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ActivateUser'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new ActivateUserResponse(); }
}

export class SendQueueTransactionList implements IReturn<SendQueueTransactionListResponse>
{

    public constructor(init?: Partial<SendQueueTransactionList>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SendQueueTransactionList'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new SendQueueTransactionListResponse(); }
}

/** @description Sign In */
// @Route("/auth", "GET,POST")
// @Route("/auth/{provider}", "GET,POST")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    /** @description AuthProvider, e.g. credentials */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public userName: string;

    // @DataMember(Order=3)
    public password: string;

    // @DataMember(Order=4)
    public rememberMe?: boolean;

    // @DataMember(Order=5)
    public accessToken: string;

    // @DataMember(Order=6)
    public accessTokenSecret: string;

    // @DataMember(Order=7)
    public returnUrl: string;

    // @DataMember(Order=8)
    public errorView: string;

    // @DataMember(Order=9)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

// @Route("/apikeys")
// @Route("/apikeys/{Environment}")
// @DataContract
export class GetApiKeys implements IReturn<GetApiKeysResponse>, IGet
{
    // @DataMember(Order=1)
    public environment: string;

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<GetApiKeys>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetApiKeys'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetApiKeysResponse(); }
}

// @Route("/apikeys/regenerate")
// @Route("/apikeys/regenerate/{Environment}")
// @DataContract
export class RegenerateApiKeys implements IReturn<RegenerateApiKeysResponse>, IPost
{
    // @DataMember(Order=1)
    public environment: string;

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<RegenerateApiKeys>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RegenerateApiKeys'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new RegenerateApiKeysResponse(); }
}

