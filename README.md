# Certify-d Web

This project supports `Certify-d`'s efforts as an online document certification platform. 

This project was generated using [Nx](https://nx.dev).

[What does this project tries to solve?](https://www.darrensemusemu.com/post/building-certify-d/)

## Project Structure

All services are for the API project  are within this single mono-repo. 
This project is structured is follows:

- [apps](./apps): contains multiple deployable applications
  - [company-webapp](./company-webapp): commissioned worker's web portal
  - [staff-webapp](./staff-webapp): staff's web portal
  - [webapp](./webapp): user's dashboard
  - [website](./website): static website with marketing related info
- [libs](./libs): shared libraries used by apps
