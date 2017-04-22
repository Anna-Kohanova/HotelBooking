package by.kohanova.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "news")
public class News implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column
    public String title;

    @ManyToOne
    @JoinColumn(name = "author")
    public User user;

    @Column
    public String content;

    @Column
    public Date date;
}

