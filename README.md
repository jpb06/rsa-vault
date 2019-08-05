# rsa-vault

A little library meant to generate, store and provide rsa keys.

## Purpose

The app is built to serve as a repository for rsa keypairs.
The respository can hold an arbitrary amount of keypairs, each defined by a identifier defining the application the keypair is defined for. The keypairs have a lifetime of 15 days.
I made this to act as an unified cryptographic provider for projects running on the same local server. Main intent is to use JSON Web Token (JWT) without having to rely on an external providers. 

## Environment / Dependencies

- Targeted for node.js, using Typescript superset for coding.
- Persitence relying on mongodb.
- DAL built on top mongoose & Typegoose.
- node-rsa for crypto.

## Version history

*  0.0.1 : Crypto service to serve/generate keypairs.
*  0.0.2 : Moving to gulp 4.0.0.
*  0.0.3 : Using new mongodb url parser.
*  0.0.4 : It's really time to put up some proper testing scheme.. (removing live tests from the index file).
*  0.0.5 : Adding mongodb basic authentication support.
*  0.0.6 : Adding caching to limit db calls. End object now returns the previously generated public key, to let the consumer verify messages signed with the previous key.
*  0.0.7 : Simplifying DB setup, expecting an interface as input.
*  0.0.8 : Fixing the issue with multiple connections.
*  0.0.9 : Properly closing the connection once we're done this time..s.

## todo

Proper tests...