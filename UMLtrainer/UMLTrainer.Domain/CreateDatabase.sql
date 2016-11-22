USE [master]
GO

IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'UMLTrainer')
DROP DATABASE [UMLTrainer]
GO

USE [master]
GO

PRINT 'Creating Database...'
CREATE DATABASE [UMLTrainer]
GO
PRINT 'Database created successfully...'
GO
PRINT 'Selecting database instance...'
GO
USE [UMLTrainer]
GO
PRINT 'Creating database tables...'

CREATE TABLE [Arrow]
( 
	[Id]                 char(18)  NOT NULL ,
	[EndForm]            char(18)  NULL ,
	[StartForm]          char(18)  NULL ,
	[LineForm]           char(18)  NULL ,
	[Text]               nvarchar(max)  NULL 
)
go

ALTER TABLE [Arrow]
	ADD CONSTRAINT [XPKArrow] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Diagram]
( 
	[Id]                 char(18)  NOT NULL ,
	[Name]               nvarchar(max)  NULL ,
	[DiagramTypeId]      char(18)  NULL 
)
go

ALTER TABLE [Diagram]
	ADD CONSTRAINT [XPKDiagram] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [DiagramType]
( 
	[Id]                 char(18)  NOT NULL ,
	[Name]               nvarchar(max)  NULL 
)
go

ALTER TABLE [DiagramType]
	ADD CONSTRAINT [XPKDiagramType] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Element]
( 
	[Id]                 char(18)  NOT NULL ,
	[Name]               nvarchar(max)  NULL ,
	[ShapeId]            char(18)  NULL ,
	[DiagramTypeId]      char(18)  NULL 
)
go

ALTER TABLE [Element]
	ADD CONSTRAINT [XPKElement] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Lection]
( 
	[Id]                 char(18)  NOT NULL ,
	[Name]               nvarchar(max)  NULL ,
	[Data]               char(18)  NULL ,
	[CreatorId]          char(18)  NULL 
)
go

ALTER TABLE [Lection]
	ADD CONSTRAINT [XPKLection] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Node]
( 
	[Id]                 char(18)  NOT NULL ,
	[ElementId]          char(18)  NULL ,
	[DiagramId]          char(18)  NULL 
)
go

ALTER TABLE [Node]
	ADD CONSTRAINT [XPKNode] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [NodeValue]
( 
	[Id]                 char(18)  NOT NULL ,
	[Value]              nvarchar(max)  NULL ,
	[PropertyId]         char(18)  NULL 
)
go

ALTER TABLE [NodeValue]
	ADD CONSTRAINT [XPKNodeValue] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Relation]
( 
	[Id]                 char(18)  NOT NULL ,
	[ParentId]           char(18)  NULL ,
	[ChildId]            char(18)  NULL ,
	[ArrowId]            char(18)  NULL 
)
go

ALTER TABLE [Relation]
	ADD CONSTRAINT [XPKRelation] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Shape]
( 
	[Id]                 char(18)  NOT NULL ,
	[Name]               nvarchar(max)  NULL 
)
go

ALTER TABLE [Shape]
	ADD CONSTRAINT [XPKShape] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Task]
( 
	[Id]                 char(18)  NOT NULL ,
	[Question]           nvarchar(max)  NULL ,
	[DiagramId]          char(18)  NULL ,
	[TopicId]            char(18)  NULL 
)
go

ALTER TABLE [Task]
	ADD CONSTRAINT [XPKTask] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TaskElement]
( 
	[Id]                 char(18)  NOT NULL ,
	[NodeId]             char(18)  NULL ,
	[TaskId]             char(18)  NULL 
)
go

ALTER TABLE [TaskElement]
	ADD CONSTRAINT [XPKTaskElement] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TaskResult]
( 
	[Id]                 char(18)  NOT NULL ,
	[IsPassed]           binary  NULL ,
	[TaskId]             char(18)  NULL ,
	[UserId]             char(18)  NULL 
)
go

ALTER TABLE [TaskResult]
	ADD CONSTRAINT [XPKTaskResult] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [Test]
( 
	[Id]                 char(18)  NOT NULL ,
	[Question]           nvarchar(max)  NULL ,
	[IsOneAnswer]        binary  NULL ,
	[TopicId]            char(18)  NULL 
)
go

ALTER TABLE [Test]
	ADD CONSTRAINT [XPKTest] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TestResult]
( 
	[Id]                 char(18)  NOT NULL ,
	[UserId]             char(18)  NULL ,
	[IsPassed]           binary  NULL ,
	[TestId]             char(18)  NULL 
)
go

ALTER TABLE [TestResult]
	ADD CONSTRAINT [XPKTestResult] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [TestVariant]
( 
	[Id]                 char(18)  NOT NULL ,
	[Text]               char(18)  NULL ,
	[IsCorrect]          binary  NULL ,
	[TestId]             char(18)  NULL 
)
go

ALTER TABLE [TestVariant]
	ADD CONSTRAINT [XPKTestVariant] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [User]
( 
	[Id]                 char(18)  NOT NULL ,
	[Name]               nvarchar(80)  NULL ,
	[UserTypeId]         char(18)  NULL 
)
go

ALTER TABLE [User]
	ADD CONSTRAINT [XPKUser] PRIMARY KEY  CLUSTERED ([Id] ASC)
go

CREATE TABLE [UserType]
( 
	[Id]                 char(18)  NOT NULL ,
	[Name]               nvarchar(50)  NULL 
)
go

ALTER TABLE [UserType]
	ADD CONSTRAINT [XPKUserType] PRIMARY KEY  CLUSTERED ([Id] ASC)
go


ALTER TABLE [Diagram]
	ADD CONSTRAINT [R_10] FOREIGN KEY ([DiagramTypeId]) REFERENCES [DiagramType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Element]
	ADD CONSTRAINT [R_3] FOREIGN KEY ([ShapeId]) REFERENCES [Shape]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Element]
	ADD CONSTRAINT [R_33] FOREIGN KEY ([DiagramTypeId]) REFERENCES [DiagramType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Lection]
	ADD CONSTRAINT [R_32] FOREIGN KEY ([CreatorId]) REFERENCES [User]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Node]
	ADD CONSTRAINT [R_4] FOREIGN KEY ([ElementId]) REFERENCES [Element]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Node]
	ADD CONSTRAINT [R_6] FOREIGN KEY ([DiagramId]) REFERENCES [Diagram]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [NodeValue]
	ADD CONSTRAINT [R_5] FOREIGN KEY ([PropertyId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Relation]
	ADD CONSTRAINT [R_7] FOREIGN KEY ([ParentId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Relation]
	ADD CONSTRAINT [R_8] FOREIGN KEY ([ChildId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Relation]
	ADD CONSTRAINT [R_9] FOREIGN KEY ([ArrowId]) REFERENCES [Arrow]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Task]
	ADD CONSTRAINT [R_13] FOREIGN KEY ([DiagramId]) REFERENCES [Diagram]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [Task]
	ADD CONSTRAINT [R_17] FOREIGN KEY ([TopicId]) REFERENCES [Lection]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TaskElement]
	ADD CONSTRAINT [R_12] FOREIGN KEY ([NodeId]) REFERENCES [Node]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [TaskElement]
	ADD CONSTRAINT [R_14] FOREIGN KEY ([TaskId]) REFERENCES [Task]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TaskResult]
	ADD CONSTRAINT [R_31] FOREIGN KEY ([TaskId]) REFERENCES [Task]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [TaskResult]
	ADD CONSTRAINT [R_34] FOREIGN KEY ([UserId]) REFERENCES [UserType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [Test]
	ADD CONSTRAINT [R_16] FOREIGN KEY ([TopicId]) REFERENCES [Lection]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TestResult]
	ADD CONSTRAINT [R_24] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go

ALTER TABLE [TestResult]
	ADD CONSTRAINT [R_30] FOREIGN KEY ([TestId]) REFERENCES [Test]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [TestVariant]
	ADD CONSTRAINT [R_15] FOREIGN KEY ([TestId]) REFERENCES [Test]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE [User]
	ADD CONSTRAINT [R_20] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType]([Id])
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go
GO
PRINT 'Tables created successfully...'
GO
PRINT 'Task successful'