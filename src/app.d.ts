// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	// interface Session {}
	// interface Stuff {}
}

interface DocumentTransition {
	start(setupPromise: () => Promise<void> | void): Promise<void>;
}

interface Document {
	createDocumentTransition(): DocumentTransition;
}

interface CSSStyleDeclaration {
	pageTransitionTag: string;
}
