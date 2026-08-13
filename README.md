# TeamFlow Task Manager

> **Enterprise-Grade Multi-Tenant Task Management API**  
> A highly scalable organizational tool built on a strict multi-tenant architecture, ensuring absolute data isolation across workspaces while delivering rapid, state-driven task workflows.

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?logo=laravel)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?logo=php)](https://www.php.net)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com)

---

## 📋 Executive Overview

TeamFlow is architected to solve the complexities of cross-team collaboration within a SaaS environment. Rather than relying on simple CRUD operations, the system is built around a robust state machine that governs task lifecycles, permissions, and transitions.

The core engineering focus of this platform is **data security through architecture**. By implementing global Eloquent scopes at the framework level, the API guarantees that users can only interact with data belonging to their authenticated workspace, entirely eliminating cross-tenant data leakage.

---

## 🏗️ System Topology

```text
┌─────────────────────────────────────────────────────────────┐
│                       React Client                          │
│             (Kanban UI & Workspace Context)                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ (REST API / JSON)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 Laravel API (PHP-FPM)                       │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Tenant Scope │  │ RBAC / Gates │  │ State Engine │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└──────────────────────┬──────────────────────────────────────┘
                       │ (Eloquent ORM)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                         MySQL 8.0                           │
│   (Multi-tenant schema with enforced cascading deletes)     │
└─────────────────────────────────────────────────────────────┘
```
🚀 Core Architectural Decisions
1. Global Multi-Tenant Isolation
Instead of manually appending where('workspace_id', $id) to queries, the platform utilizes Laravel Global Scopes injected during the authentication middleware lifecycle. This ensures that every database query automatically filters by the active tenant, making accidental cross-tenant data exposure mathematically impossible at the ORM level.

2. Strict Role-Based Access Control (RBAC)
Authorization is decoupled from the controller logic. Laravel Policies and Gates are implemented to verify permissions before any state change occurs. A user may have admin rights in Workspace A, but only viewer rights in Workspace B, with the backend dynamically resolving these permissions per request.

3. Enum-Backed State Machines
Task statuses (e.g., Backlog, In_Progress, In_Review, Completed) are not loose strings. They are strictly typed using PHP 8.1+ Enums and governed by a state machine pattern. This prevents illegal transitions—ensuring a task cannot move from Backlog directly to Completed without passing through the required workflow gates.

🛠️ Local Development & Setup
The environment is containerized using Laravel Sail, providing a zero-config setup for the database and backend services.

Prerequisites
Docker Desktop

Node.js (v18+)

Composer

Installation
```bash
# 1. Clone the repository
git clone [https://github.com/ali-ismail-dev/teamflow-task-manager.git](https://github.com/ali-ismail-dev/teamflow-task-manager.git)
cd teamflow-task-manager

# 2. Install dependencies
composer install
npm install

# 3. Configure environment
cp .env.example .env
php artisan key:generate

# 4. Boot infrastructure
./vendor/bin/sail up -d

# 5. Run migrations and seed multi-tenant dummy data
./vendor/bin/sail artisan migrate --seed

# 6. Start the frontend build tool
npm run dev
```
🧪 Testing & Validation
The test suite heavily focuses on authorization and tenant boundary validation to ensure the SaaS architecture remains airtight.
```bash
# Run all unit and feature tests
./vendor/bin/sail artisan test

# Run tests specifically checking tenant isolation boundaries
./vendor/bin/sail artisan test --filter=TenantIsolationTest
```
Architected and maintained by Ali Ismail.
