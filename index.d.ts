import * as mongooseLocal from 'mongoose'
import { ObjectID } from 'mongodb'
import * as express from "express"


/**
 * Describe a Keystone Model.
 */
export type IKeystoneModel<T extends mongooseLocal.Document> = mongooseLocal.Model<T>;

/**
 * Describe a Keystone Document.
 */
export type IKeystoneDocument = mongooseLocal.Document;

/**
 * Describe a Keystone Model Identifier.
 */
export type IKeystoneModelId = ObjectID;

/**
 * Initialize the keystone instance.
 */
export function init(options: Optionalized<KeystoneOptions>): void

/**
 * Start the keystone instance.
 * TODO:  work in the 'any' part
 */
export function start(options? : any): void;

/**
 * An instance of mongoose
 */
export const mongoose: mongooseLocal.Mongoose;

/**
 * Class that implements the Field interface
 */
export const Field: IField;

/**
 * Class that implements the List interface
 */
export const List: IList;

/**
 * Gets a list model by its key.
 */
export function list(key: string): IList;

/**
 * Return the model collection properly prefixed
 */
export function prefixModel(string): string;

/**
 * Gets a value by its key.
 */
export function get(key: keyof KeystoneOptions): string

/**
 * Sets a key/value pair.
 */
export function set(key: keyof KeystoneOptions, value: any): void

/**
 * A keystone view constructor
 */
export const View: IView;

/**
 * Configure a pre-route
 */
export function pre(event: string, middleware: Function): void

/**
 * Imports all modules in the given directory
 */
export function importer(path: string): any

/**
 * Middleware to init the keystone API
 */
export const middleware : {
	api(req: any, res: any, next: () => void): void
};

/**
 * Utilities
 */
export const utils: any;

/**
 * Content
 */
export const content: {
	editable: boolean
};

export function expandPath(path: string): string;

export const Storage: any;


type Optionalized<T> = {
	[k in keyof T]?: T[k]
}

export interface KeystoneDocumentedOptions {

	//https://keystonejs.com/documentation/configuration/project-options
	name: string
	brand: string
	"module root": string
	"frame guard": boolean | "sameOrigin" | "deny"
	"csv field delimiter": string
	app: object
	mongoose: mongooseLocal.Mongoose

	//https://keystonejs.com/documentation/configuration
	"ga property": string
	"ga domain": string
	"google api key": string
	"google server api key": string
	"default region": string
	"embedly api key": string
	"headless": boolean

	//https://keystonejs.com/documentation/configuration/server-options
	env: "production" | "development"
	port: number
	host: string
	"view engine": string
	"custom engine": Function
	"view cache": boolean
	locals: object
	static: string | string[]
	"static options": object
	less: string | string[]
	"less options": object
	sass: string | string[]
	"sass options": object
	favicon: string
	compress: boolean
	logger: string
	"logger options": object
	"logging middleware" : express.RequestHandler
	"trust proxy": boolean
	ssl: boolean | string
	"ssl key": string
	"ssl cert": string
	"ssl ca": string
	"ssl port": number
	"ssl public port": number
	"ssl host": string
	letsencrypt: {
		email: string
		domains: string | string[]
		register: boolean
		tos: boolean
		production: boolean
	}
	"unix socket": string

	//https://keystonejs.com/documentation/configuration/database-options
	mongo: string
	"model prefix": string
	auth: boolean | Function
	"user model": string
	"cookie secret": string
	"session store": string | Function
	"session store options": object
	"back url": string
	"signin url": string
	"signin redirect": string
	"signout url": string
	"signout redirect": string

	//https://keystonejs.com/documentation/configuration/admin-ui-options
	nav: {
		[key: string]: string | string[] | {
			label: string,
			key: string
			path: URL
		}
	}
}

export interface KeystoneCustomOptions {
	"signin logo": string
}

export interface KeystoneOptions extends KeystoneDocumentedOptions, KeystoneCustomOptions {
	"cloudinary secure": boolean
	session: boolean
	"admin path": string
	views: string
	routes: any
	"codemirror url path"?: string
	"cloudinary config": {
		cloud_name: string
		api_key: string
	}
	appversion: string
	"powered by": {
		website: URL
		name: string
	}
	"tinymceUrl" : string
	"wysiwyg s3 images": boolean
}

/**
 * Keystone List Interface -- https://github.com/keystonejs/keystone/blob/master/lib/list.js
 */
export interface IList extends mongooseLocal.Document {

	// https://github.com/keystonejs/keystone/blob/master/lib/list.js
	new(key: string, options: Object): IList;

	key: string;

	singular: string;

	plural: string;

	// https://github.com/keystonejs/keystone/blob/master/lib/list/add.js
	add(...obj: Object[]): void;

	add(prefix?: string, ...args: any[]): void;

	getDocumentName(doc: any): string;

	// https://github.com/keystonejs/keystone/blob/master/lib/list/relationship.js
	relationship(def: Object): IList;

	// https://github.com/keystonejs/keystone/blob/master/lib/list.js
	defaultColumns: string;

	defaultSort: string;

	// https://github.com/keystonejs/keystone/blob/master/lib/list/register.js
	register(): IList;

	fields: [IField];

	fieldsArray: [IField];

	__doc: mongooseLocal.Document;

	/**
	 * Updates the value for this field in the item from a data object.
	 *
	 * @param item containing the field's data
	 * @param data the field's data
	 * @param options optional options
	 * @param callback the function to call after done processing
	 */
	updateItem(item: IList, data: Object, options: any, callback: (err: Error) => void): void;
}

/**
 * The keystone's view interface. See https://github.com/keystonejs/keystone/blob/master/lib/view.js
 */
export interface IView {
	new(req: any, res: any): IView;

	/**
	 * Adds a method (or array of methods) to be executed in parallel
	 * to the `init`, `action` or `render` queue.
	 */
	on(event : "init" | "action" | "render", Function): void;

	/**
	 * Queues a mongoose query for execution before the view is rendered.
	 * The results of the query are set in `locals[key]`.
	 *
	 * Keys can be nested paths, containing objects will be created as required.
	 *
	 * The third argument `then` can be a method to call after the query is completed
	 * like function(err, results, callback), or a `populatedRelated` definition
	 * (string or array).
	 *
	 * Examples:
	 *
	 * view.query('books', keystone.list('Book').model.find());
	 *
	 *     an array of books from the database will be added to locals.books. You can
	 *     also nest properties on the locals variable.
	 *
	 * view.query(
	 *     'admin.books',
	 *      keystone.list('Book').model.find().where('user', 'Admin')
	 * );
	 *
	 *     locals.admin.books will be the result of the query
	 *     views.query().then is always called if it is available
	 *
	 * view.query('books', keystone.list('Book').model.find())
	 *     .then(function (err, results, next) {
	 *         if (err) return next(err);
	 *         console.log(results);
	 *         next();
	 *     });
	 */
	query(): any;

	/**
	 * Executes the current queue of init and action methods in series, and
	 * then executes the render function. If renderFn is a string, it is provided
	 * to `res.render`.
	 *
	 * It is expected that *most* init and action stacks require processing in
	 * series.  If there are several init or action methods that should be run in
	 * parallel, queue them as an array, e.g. `view.on('init', [first, second])`.
	 */
	render(path: string, callback?: () => void): void;
}

export interface IField {
	/**
	 * Constructor
	 *
	 * @param list the parent list
	 * @param path the parent list path
	 * @param options the field options
	 */
	new(list: IList, path: string, options: Object);

	/**
	 * Get the field's options.
	 */
	getOptions(): Object;

	/**
	 * Get the field's width size.
	 */
	getSize(): string;

	/**
	 * Get the field's default value.
	 */
	getDefaultValue(): any;

	/**
	 * Get the field's data.
	 */
	getData(): any;

	/**
	 * Get the field's pre-save watcher.
	 */
	getPreSaveWatcher(): boolean;

	/**
	 * Register the field in the list's mongoose schema.
	 */
	addToSchema(): void;

	/**
	 * Bind the field's underscore methods.
	 */
	bindUnderscoreMethods(): void;

	/**
	 * Adds a method to the underscoreMethods collection on the field's list,
	 * with a path prefix to match this field's path and bound to the document.
	 *
	 * @param path the underscore method path
	 * @param Function the underscore method to call
	 */
	underscoreMethod(path: string, Function): void;

	/**
	 * Format the field's value.
	 *
	 * @param item containing the field's data
	 */
	format(item: IList): any;

	/**
	 * Check if the field been modified.
	 *
	 * @param item containing the field's data
	 */
	isModified(item: IList): boolean;

	/**
	 * Validate the field's input.
	 *
	 * @param data the field's data
	 * @param callback the function to call after done processing
	 */
	validateInput(data: Object, callback: () => void): void;

	/**
	 * Validate the field's requied input.
	 *
	 * @param item containing the field's data
	 * @param data the field's data
	 * @param callback the function to call after done processing
	 */
	validateRequiredInput(item: IList, data: Object, callback: () => void): void;

	/**
	 * Updates the value for this field in the item from a data object.
	 *
	 * @param item containing the field's data
	 * @param data the field's data
	 * @param callback the function to call after done processing
	 */
	updateItem(item: IList, data: Object, callback: () => void): void;

	/**
	 *Retrieves the value from an object, whether the path is nested or flattened.
	 *
	 * @param data the field's data
	 * @param subpath the subpath to return data for
	 */
	getValueFromData(data: Object, subpath: string): any;

	/**
	 * Define the available field types.
	 */
	Types: any;	// TODO:  create modules for all field types and reference them here?

	/**
	 * Relationship reference list.
	 */
	refList: IList;

	/**
	 * The field type.
	 */
	type: string;

	/**
	 * The field path.
	 */
	path: string;

	/**
	 * The field paths.
	 */
	paths: [string];

	/**
	 * The field label.
	 */
	label: string;

	/**
	 * The field note.
	 */
	note: string;

	/**
	 * The field size.
	 */
	size: number;

	/**
	 * Whether the field is initially filled when constructed.
	 */
	initial: boolean;

	/**
	 * Whether the field is required.
	 */
	required: boolean;

	/**
	 * The field column.
	 */
	col: string;

	/**
	 * Whether the field is not editable.
	 */
	noedit: boolean;

	/**
	 * Whether the field is not col.
	 */
	nocol: boolean;

	/**
	 * Whether the field is not sortable.
	 */
	nosort: boolean;

	/**
	 * The field indentation.
	 */
	indent: string;

	/**
	 * Whether the field is hidden.
	 */
	hidden: boolean;

	/**
	 * Whether the field should be collapse.
	 */
	collapse: boolean;

	/**
	 * The field's dependencies.
	 */
	dependsOn: any;

	/**
	 * Whether the field should auto clean.
	 */
	autoCleanup: any;
}

export interface Relationship extends IList {
	options: {
		many: boolean;
		ref: string;
	}
}
