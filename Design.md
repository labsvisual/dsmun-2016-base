## Backends
The backend is divided into two sections; one for the web application, and one for the mobile
application.

The database for the both the applications is a single-tier MariaDB database with a Master-Slave
replication setup. For failover, the slave is promoted to master, and that is used.

In order to speed up the application, and the backend, a Redis Key-Value store is also used. This
store provides the backbone for a deferred queue processing system.

Total Number of EC2 Instances: 4 ( ~ $80/month )
----------------------------------------------------------------------------------------------------
