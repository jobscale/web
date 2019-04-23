;
; BIND data file for local loopback interface
;
$TTL 60
@  IN  SOA  jsx.jp. root.jsx.jp. (
           2   ; Serial
      604800   ; Refresh
       86400   ; Retry
     2419200   ; Expire
      604800 ) ; Negative Cache TTL
;

@       IN      NS      ns1
@       IN      NS      ns2
@       IN      NS      ns3
aws     IN      NS      ns11.value-domain.com.
aws     IN      NS      ns12.value-domain.com.
aws     IN      NS      ns13.value-domain.com.

@       IN      A       172.16.6.22
*       IN      A       172.16.6.22

ns1     IN      A       172.16.6.22
ns2     IN      A       172.16.6.22
ns3     IN      A       172.16.6.22

novus   IN      A       172.16.6.22
db      IN      A       172.16.6.22
db-ro   IN      A       172.16.6.22
redis   IN      A       172.16.6.22
uranus  IN      A       172.16.6.22

earth   IN      A       172.16.6.61
