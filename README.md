# rsa-provider

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

## todo

Proper tests...