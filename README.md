# Queuetie Service 🚀

[![Build & Test](https://github.com/dejan-babic-symphony/queuetie-service/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/dejan-babic-symphony/queuetie-service/actions/workflows/build-and-test.yml)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/dejan-babic-symphony/queuetie-service)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

NestJS based app that is part of the Queuetie system responsible for dispatching simulation jobs

## Table of Contents

- [Queuetie Service 🚀](#queuetie-service-)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Configuration](#configuration)

## Setup

The `Queuetie Service` is part of a `Queuetie` app. It is recommended to run it using the monorepo with all the needed components and setup. Follow the instructions from there but you can start with

```bash
git clone git@github.com:dejan-babic-symphony/queuetie.git --recurse-submodules
```

## Usage

View the OpenApi specification on the root path `/`

To view the json and yaml openapi specifications open

```
/openapi.json
/openapi.yaml
```

## Configuration

There a two env files in this repo.

- Create a `.env` from `env.example` for local runs
- The `.env.test` is already prepared for running test locally
