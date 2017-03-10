#!/usr/bin/env bash
migrate -url postgres://spark:salasala@postgres1.cyberpunk/arco?sslmode=disable --path ./postgres/ up