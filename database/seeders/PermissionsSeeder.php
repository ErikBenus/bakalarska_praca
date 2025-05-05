<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

            // Create roles
            $adminRole = Role::create(['name' => 'admin']);
            $trainerRole = Role::create(['name' => 'trainer']);
            $clientRole = Role::create(['name' => 'client']);

            // Create permissions
            $editAll = Permission::create(['name' => 'edit all']);
            $editArticles = Permission::create(['name' => 'edit articles']);
            $viewArticles= Permission::create(['name' => 'view articles']);
            $seeClientDashboard = Permission::create(['name' => 'see client dashboard']);
            $seeTrainerDashboard = Permission::create(['name' => 'see trainer dashboard']);
            $useAdminPrivileges = Permission::create(['name' => 'use admin privileges']);

            // Assign permissions to roles
            $adminRole->givePermissionTo($editAll);
            $adminRole->givePermissionTo($editArticles);
            $adminRole->givePermissionTo($viewArticles);
            $adminRole->givePermissionTo($seeTrainerDashboard);
            $adminRole->givePermissionTo($useAdminPrivileges);

            $trainerRole->givePermissionTo($editArticles);
            $trainerRole->givePermissionTo($viewArticles);
            $trainerRole->givePermissionTo($seeTrainerDashboard);

            $clientRole->givePermissionTo($viewArticles);
            $clientRole->givePermissionTo($seeClientDashboard);

            // Assign role to user
            $user = User::find(1);
            $user->assignRole('admin');

            $user = User::find(2);
            $user->assignRole('trainer');

            $user = User::find(3);
            $user->assignRole('client');

    }
}
