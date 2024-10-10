class PasswordNotMatchingError extends Error {
    constructor(message = 'Password are not matching') {
        super();
        this.message = message;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class NoValuesFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class ServiceNotConfiguredError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class PlatformNotCompatible extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class BadParameters extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

module.exports = {
    PasswordNotMatchingError,
    NotFoundError,
    ServiceNotConfiguredError,
    BadParameters,
    NoValuesFoundError,
    PlatformNotCompatible,
};
